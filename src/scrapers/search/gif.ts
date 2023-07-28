import urlcat from 'urlcat'
import { Route } from '../../apis'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { removeProtectionBracket } from '../../utils/utils'
import { parseCounting, parsePaging } from './base'
import type { Engine } from '../../core/engine'
import type { Counting, GifSearchOptions, Paging } from '../../types'
import type { CheerioAPI } from 'cheerio'

export interface GifSearchResult {
    title: string
    url: string
    mp4: string
    webm: string
}

export async function gifSearch(engine: Engine, keyword: string, options: GifSearchOptions): Promise<{
    data: GifSearchResult[]
    paging: Paging
    counting: Counting
}> {
    const url = Route.gifSearch(keyword, options)
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
    const list = $('ul.gifLink li.gifVideoBlock')
    const result = list.map((_, el) => {
        const item = $(el)

        const video = item.find('video')
        const poster = getAttribute<string>(video, 'poster', '')
        const path = getAttribute<string>(item.find('a'), 'href', '')

        return {
            title: item.find('.title').text(),
            url: urlcat(BASE_URL, path),
            mp4: getDataAttribute<string>(video, 'mp4', ''),
            webm: getDataAttribute<string>(video, 'webm', ''),
            preview: removeProtectionBracket(poster),
        }
    }).get()

    return result
}
