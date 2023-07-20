import { URLSearchParams } from 'node:url'
import createDebug from 'debug'
import fetch from 'node-fetch'
import { getCheerio } from '../utils/cheerio'
import { HttpStatusError, IllegalError } from '../utils/error'
import type { HeadersInit, RequestInit, Response } from 'node-fetch'

const debug = createDebug('request')

export class Request {
    _agent: RequestInit['agent']
    _headers: Record<string, string> = {}
    _cookie: Map<any, any> = new Map()

    setAgent(agent: RequestInit['agent']) {
        this._agent = agent
    }

    setHeader(key: string, value: string) {
        this._headers[key] = value
    }

    get cookie() {
        return Array.from(this._cookie).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('; ')
    }

    setCookie(key: string, value: any) {
        this._cookie.set(key, value)
    }

    async checkStatus(res: Response) {
        if (res.ok) return res

        if (res.status === 404) {
            let html = ''
            try {
                html = await res.text()
            }
            catch (error) {
                // ignore
            }

            if (/class="deterrenceWarn"/.test(html)) {
                const $ = getCheerio(html)
                const warning = $('.deterrenceWarn').text()
                if (warning) {
                    return Promise.reject(new IllegalError(warning))
                }
            }
        }
        return Promise.reject(new HttpStatusError(`${res.status} ${res.statusText} at ${res.url}`))
    }

    parseCookieItem(str: string) {
        if (str.includes(';')) str = str.split(';')[0]

        return str.split('=')
    }

    handleSetCookie(res: Response) {
        if (!res.headers.raw()['set-cookie']) return res

        res.headers.raw()['set-cookie'].forEach((item) => {
            const [key, value] = this.parseCookieItem(item)
            this._cookie.set(key, value)
        })

        this.setHeader('Cookie', this.cookie)
        return res
    }

    toJson(res: Response) {
        const contentType = res.headers.get('content-type') || ''
        return contentType.includes('json') ? res.json() : res.text()
    }

    buildParams<U extends Record<string, any>>(data: U) {
        const params = new URLSearchParams()
        Object.keys(data).forEach((key) => {
            params.append(key, data[key])
        })
        return params
    }

    buildRequest<U extends Record<string, any>, T>(method: 'get' | 'post' | 'post-form', url: string, data?: U): Promise<T> {
        const headers: HeadersInit = {}
        const opts: RequestInit = { method, headers }

        if (method === 'post') {
            headers['Content-Type'] = 'application/json'
            opts.body = JSON.stringify(data)
        }

        if (method === 'post-form') {
            // headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            opts.method = 'post'
            if (data) opts.body = this.buildParams<U>(data)
        }

        return this.fetch(url, opts)
            .then(res => this.toJson(res) as T)
            .catch(err => Promise.reject(err))
    }

    fetch(url: string, opts: RequestInit = {}): Promise<Response> {
        const headers = Object.assign({}, this._headers, opts.headers)

        return fetch(url, {
            ...opts,
            headers,
            ...this._agent && { agent: this._agent },
        })
            .then(res => this.checkStatus(res))
            .then(res => this.handleSetCookie(res))
    }

    get<T>(url: string): Promise<T> {
        debug(`GET ${url}`)
        return this.buildRequest('get', url)
    }

    post<T, U extends object = any>(url: string, data: U): Promise<T> {
        debug(`POST ${url}`)
        return this.buildRequest('post', url, data)
    }

    postForm<T, U extends object = any>(url: string, data: U): Promise<T> {
        debug(`POST ${url}`)
        return this.buildRequest('post-form', url, data)
    }

    raw(url: string): Promise<string> {
        debug(`GET ${url}`)
        return this.buildRequest('get', url)
    }
}
