const { Events } = require('../utils/constant')
const cheerio = require('cheerio')

class Action {
    constructor (engine) {
        this.engine = engine
    }

    async login (account, password) {
        if (this.engine.user.loggedIn) return
        if (!account || typeof account !== 'string') throw new Error('Invalid Account')
        if (!password || typeof password !== 'string') throw new Error('Invalid Password')
        this.engine.emit(Events.DEBUG, `[DEBUG]: Trying to login...`)

        const { token, redirect } = await this.getToken()
        const result = await this.sendLoginForm(account, password, token, redirect)

        if (result.success) {
            this.engine.emit(Events.LOGIN)
            return {
                success: true,
                message: 'Successfully logged in.',
                premium: result.premium_redirect_cookie === '1'
            }
        } else {
            return {
                success: false,
                message: `Login fail, Reason: ${result.message}`
            }
        }
    }

    getMainPage () {
        return this.engine.API.get()
    }

    getToken () {
        return this.getMainPage()
            .then(html => {
                const $ = cheerio.load(html)
                const token = $('[name="token"]').attr('value')
                const redirect = $('[name="redirect"]').attr('value')
                return { token, redirect }
            })
            .catch(err => Promise.reject(err))
    }

    sendLoginForm (account, password, token, redirect) {
        const data = {
            redirect: redirect,
            token: token,
            remember_me: 1,
            from: 'pc_login_modal_:show',
            username: account,
            password: password,
            setSendTip: false
        }

        return this.engine.API.front.authenticate.postForm(data)
    }

    async logout () {
        if (!this.engine.user.loggedIn) {
            return {
                success: false,
                message: `You haven't logged in.`
            }
        }

        try {
            const mainPage = await this.getMainPage()
            const token = /href="\/user\/logout\?token=([a-zA-Z0-9-_.]*?)"/.exec(mainPage)[1]
            await this.engine.API.user.logout.query({ token: token }).get()

            this.engine.emit(Events.LOGOUT)
            return {
                success: true,
                message: 'Successfully logged out'
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

module.exports = Action
