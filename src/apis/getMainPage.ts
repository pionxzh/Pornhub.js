import { Route } from './route'
import type { Engine } from '../core/engine'

export async function getMainPage(engine: Engine) {
    const html = await engine.request.raw(Route.mainPage())
    return html
}
