import type { Engine } from '../core/engine'
import { Route } from './route'

export async function getMainPage(engine: Engine) {
    const html = await engine.request.raw(Route.mainPage())
    return html
}
