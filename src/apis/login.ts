import { getCheerio } from '../utils/cheerio'
import { getMainPage } from './getMainPage'
import { Route } from './route'
import type { Engine } from '../core/engine'

interface LoginResult {
    success: boolean
    message: string
    premium_redirect_cookie: string
}

export async function login(engine: Engine, account: string, password: string) {
    if (!account || typeof account !== 'string') throw new Error('Invalid Account')
    if (!password || typeof password !== 'string') throw new Error('Invalid Password')

    const { token, redirect } = await getToken(engine)
    const result = await sendLoginForm(engine, account, password, token, redirect)

    if (result.success) {
        return {
            success: true,
            message: 'Successfully logged in.',
            premium: result.premium_redirect_cookie === '1',
        }
    }
    else {
        return {
            success: false,
            message: `Login fail, Reason: ${result.message}`,
            premium: false,
        }
    }
}

async function getToken(engine: Engine) {
    try {
        const html = await getMainPage(engine)
        const $ = getCheerio(html)
        const token = $('[name="token"]').attr('value') || ''
        const redirect = $('[name="redirect"]').attr('value') || ''
        return { token, redirect }
    }
    catch (err) {
        return await Promise.reject(err)
    }
}

async function sendLoginForm(engine: Engine, account: string, password: string, token: string, redirect: string) {
    const data = {
        redirect,
        token,
        remember_me: 1,
        from: 'pc_login_modal_:show',
        username: account,
        password,
        setSendTip: false,
    }

    const res = await engine.request.postForm(Route.authenticate(), data)
    const result = await res.json() as LoginResult
    return result
}
