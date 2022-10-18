import type { Engine } from '../core/engine'
import { getCheerio, getDataAttribute } from '../utils/cheerio'
import { getMainPage } from './getMainPage'

export async function getToken(engine: Engine) {
    const html = await getMainPage(engine)
    const $ = getCheerio(html)
    const inputEl = $('form#search_form input[name="search"]')
    const token = getDataAttribute<string, null>(inputEl, 'token', null)
    if (!token) throw new Error('Failed to get token')
    return token
}
