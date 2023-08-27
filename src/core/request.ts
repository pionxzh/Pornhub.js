import { URLSearchParams } from 'node:url'
import createDebug from 'debug'
import fetch from 'node-fetch'
import { getCheerio } from '../utils/cheerio'
import { HttpStatusError, IllegalError } from '../utils/error'
import type { HeadersInit, RequestInit, Response } from 'node-fetch'

const debug = createDebug('REQUEST')

export class Request {
    private _agent: RequestInit['agent']
    private _headers: Record<string, string> = {}
    private _cookie: Map<any, any> = new Map()

    setAgent(agent: RequestInit['agent']) {
        this._agent = agent
    }

    setHeader(key: string, value: string) {
        if (key !== 'Cookie') debug(`[Header] Set: ${key}=${value}`)
        this._headers[key] = value
    }

    private get cookieString() {
        return Array.from(this._cookie).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('; ')
    }

    getCookies(): Record<string, string> {
        return Object.fromEntries(this._cookie)
    }

    getCookie(key: string) {
        return this._cookie.get(key)
    }

    setCookie(key: string, value: any) {
        debug(`[Cookie] Set: ${key}=${value}`)
        this._cookie.set(key, value)
    }

    deleteCookie(key: string) {
        debug(`[Cookie] Del: ${key}`)
        this._cookie.delete(key)
    }

    private async _checkStatus(res: Response) {
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

    private _parseCookieItem(str: string) {
        if (str.includes(';')) str = str.split(';')[0]

        return str.split('=')
    }

    private _handleSetCookie(res: Response) {
        if (!res.headers.raw()['set-cookie']) return res

        res.headers.raw()['set-cookie'].forEach((item) => {
            const [key, value] = this._parseCookieItem(item)
            debug(`[Cookie] Received Set-Cookie: ${key}=${value}`)
            this._cookie.set(key, value)
        })

        return res
    }

    private _buildParams<U extends Record<string, any>>(data: U) {
        const params = new URLSearchParams()
        Object.keys(data).forEach((key) => {
            params.append(key, data[key])
        })
        return params
    }

    private _buildRequest<U extends Record<string, any>>(method: 'get' | 'post' | 'post-form', url: string, data?: U) {
        const headers: HeadersInit = {}
        const opts: RequestInit = { method, headers }

        if (method === 'post') {
            headers['Content-Type'] = 'application/json'
            opts.body = JSON.stringify(data)
        }

        if (method === 'post-form') {
            // headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            opts.method = 'post'
            if (data) opts.body = this._buildParams<U>(data)
        }

        return this.fetch(url, opts)
    }

    async fetch(url: string, opts: RequestInit = {}): Promise<Response> {
        const headers = Object.assign({}, this._headers, opts.headers, {
            cookie: this.cookieString,
        })

        const method = opts.method?.toUpperCase() || 'GET'
        debug(`[ RQST ] ${method} ${url}`)

        const res = await fetch(url, {
            ...opts,
            headers,
            ...this._agent && { agent: this._agent },
        })

        debug(`[ RESP ] ${method} ${url} ${res.status} ${res.statusText}`)

        if (res.url !== url) {
            debug(`Redirected from ${url} to ${res.url}`)
        }

        await this._checkStatus(res)
        this._handleSetCookie(res)

        return res
    }

    get(url: string) {
        return this._buildRequest('get', url)
    }

    post<U extends object = any>(url: string, data: U) {
        return this._buildRequest('post', url, data)
    }

    postForm<U extends object = any>(url: string, data: U) {
        return this._buildRequest('post-form', url, data)
    }
}
