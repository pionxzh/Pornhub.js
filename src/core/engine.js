const Action = require('./action')
const Request = require('./request')
const SemanticApi = require('semantic-api')
const EventEmitter = require('eventemitter3')
const { Events } = require('../utils/constant')
const { BASE_URL } = require('../utils/constant')

class Engine extends EventEmitter {
    constructor () {
        super()

        this.request = new Request(this)
        this.action = new Action(this)

        this.BASE_URL = BASE_URL

        this.user = {
            loggedIn: false
        }
    }

    get API () {
        const customFn = {
            type: (args, calls, url) => {
                const opt = args.shift()
                if (opt !== '') calls.push(opt)
            },
            get: (args, calls, url) => {
                return this.request.get(url)
            },
            post: (args, calls, url) => {
                const data = args.shift()
                return this.request.post(url, data)
            },
            postForm: (args, calls, url) => {
                const data = args.shift()
                return this.request.postForm(url, data)
            }
        }
        return new SemanticApi(`${this.BASE_URL}/`, customFn)
    }

    handleEvent () {
        this.on(Events.REQUEST, (url) => {
            this.user.loggedIn = false
            this.emit(Events.DEBUG, `[REQUEST]: ${url}`)
        })

        this.on(Events.LOGIN, () => {
            this.user.loggedIn = true
            this.emit(Events.DEBUG, `[DEBUG]: LoggedIn successfully`)
        })

        this.on(Events.LOGOUT, () => {
            this.user.loggedIn = false
            this.emit(Events.DEBUG, `[DEBUG]: Logout successfully`)
        })
    }

    setupRequestHeader () {
        this.request.setHeaders('Host', this.BASE_URL.replace('https://', ''))
        this.request.setHeaders('Origin', this.BASE_URL)
        this.request.setHeaders('Referer', `${this.BASE_URL}/`)
        this.request.setHeaders('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36}')
    }

    start () {
        this.handleEvent()
        this.setupRequestHeader()
    }
}

module.exports = Engine
