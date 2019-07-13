const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const { Events, HttpStatusError } = require('../utils/constant')

class Request {
    constructor (engine) {
        this.engine = engine

        this._agent = null
        this._headers = {}
        this._cookie = new Map()
    }

    setAgent (agent) {
        this._agent = agent
    }

    setHeaders (key, value) {
        this._headers[key] = value
    }

    get cookie () {
        return Array.from(this._cookie).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('; ')
    }

    setCookie (key, value) {
        this._cookie.set(key, value)
    }

    checkStatus (res) {
        if (res.ok) return res
        return Promise.reject(new HttpStatusError(`${res.status} ${res.statusText}`))
    }

    parseCookieItem (str) {
        if (str.includes(';')) {
            str = str.split(';')[0]
        }
        return str.split('=')
    }

    handleSetCookie (res) {
        if (!res.headers.raw()['set-cookie']) return res

        res.headers.raw()['set-cookie'].forEach(item => {
            const [key, value] = this.parseCookieItem(item)
            this._cookie.set(key, value)
        })

        this.setHeaders('Cookie', this.cookie)
        return res
    }

    toJson (res) {
        const contentType = res.headers.get('content-type')
        return contentType.includes('json') ? res.json() : res.text()
    }

    buildParams (data) {
        let params = new URLSearchParams()
        Object.keys(data).forEach(key => {
            params.append(key, data[key])
        })
        return params
    }

    buildRequest (method, url, data) {
        let opts = {}
        let headers = Object.assign({}, this._headers)

        if (method === 'get') {
            opts.method = 'get'
        }

        if (method === 'post') {
            headers['Content-Type'] = 'application/json'
            opts.method = 'post'
            opts.body = data
        }

        if (method === 'post-form') {
            // headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            opts.method = 'post'
            opts.body = this.buildParams(data)
        }

        headers && (opts.headers = headers)
        this._agent && (opts.agent = this._agent)

        return fetch(url, opts)
            .then(res => this.checkStatus(res))
            .then(res => this.handleSetCookie(res))
            .then(res => this.toJson(res))
            // .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err))
    }

    get (url) {
        this.engine.emit(Events.REQUEST, `GET ${url}`)
        return this.buildRequest('get', url, null)
    }

    post (url, data) {
        this.engine.emit(Events.REQUEST, `POST ${url}`)
        return this.buildRequest('post', url, data)
    }

    postForm (url, data) {
        this.engine.emit(Events.REQUEST, `POST ${url}`)
        return this.buildRequest('post-form', url, data)
    }
}

module.exports = Request
