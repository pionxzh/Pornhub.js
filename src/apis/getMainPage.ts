import { Route } from './route'
import type { Engine } from '../core/engine'

export async function getMainPage(engine: Engine) {
    const url = Route.mainPage()
    const res = await engine.request.get(url)
    const html = await res.text()
    return html
}
