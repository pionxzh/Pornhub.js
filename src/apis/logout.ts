import { getMainPage } from './getMainPage'
import { Route } from './route'
import type { Engine } from '../core/engine'

export async function logout(engine: Engine) {
    try {
        const mainPage = await getMainPage(engine)
        const result = /href="\/user\/logout\?token=([a-zA-Z0-9-_.]*?)"/.exec(mainPage)
        if (!result) throw new Error('Logout failed')

        const token = result[1]
        await engine.request.get(Route.logout(token))

        return {
            success: true,
            message: 'Successfully logged out',
        }
    }
    catch (err) {
        return Promise.reject(err)
    }
}
