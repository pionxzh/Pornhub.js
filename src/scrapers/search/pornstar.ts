import urlcat from 'urlcat'
import { Route } from '../../apis'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { parseCounting, parsePaging } from './base'
import type { Engine } from '../../core/engine'
import type { Counting, Paging, PornstarSearchOptions } from '../../types'
import type { CheerioAPI } from 'cheerio'

export interface PornstarSearchResult {
    name: string
    url: string
    views: string
    videoNum: number
    rank: number
    photo: string
}

export async function pornstarSearch(engine: Engine, keyword: string, options: PornstarSearchOptions): Promise<{
    data: PornstarSearchResult[]
    paging: Paging
    counting: Counting
}> {
    const url = Route.pornstarSearch(keyword, options)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return {
        data: parseResult($),
        paging: parsePaging($),
        counting: parseCounting($),
    }
}

function parseResult($: CheerioAPI) {
    const $list = $('ul#pornstarsSearchResult li div.wrap')
    const result = $list.map((_, el) => {
        const item = $(el)
        const path = getAttribute<string>(item.find('a'), 'href', '')
        const img = item.find('img')

        return {
            name: item.find('.title').text(),
            url: urlcat(BASE_URL, path),
            views: item.find('.pstarViews').text().replace('views', '').trim() || '0',
            videoNum: Number.parseInt(item.find('.videosNumber').text()) || 0,
            rank: Number.parseInt(item.find('.rank_number').text()) || 0,
            photo: getDataAttribute<string>(img, 'thumb_url', ''),
        }
    }).get()

    return result
}
