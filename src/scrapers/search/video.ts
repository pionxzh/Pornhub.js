import urlcat from 'urlcat'
import { Route } from '../../apis'
import { getAttribute, getCheerio } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { UrlParser } from '../../utils/url'
import { nonNullable } from '../../utils/utils'
import { parseCounting, parsePaging } from './base'
import type { Engine } from '../../core/engine'
import type { Counting, Paging, VideoSearchOptions } from '../../types'
import type { Cheerio, CheerioAPI, Element } from 'cheerio'

export interface VideoListResult {
    title: string
    id: string
    url: string
    views: string
    duration: string
    /** @deprecated This is no longer valid in pornhub's new version. We don't have a way to tell */
    hd: boolean
    /** @deprecated This is no longer valid in pornhub's new version, use `freePremium` instead */
    premium: boolean
    freePremium: boolean
    preview: string
}

export type VideoSearchResult = VideoListResult

export async function videoSearch(engine: Engine, keyword: string, options: VideoSearchOptions): Promise<{
    data: VideoSearchResult[]
    paging: Paging
    counting: Counting
}> {
    const url = Route.videoSearch(keyword, options)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return {
        data: parseVideoResult($, '#videoSearchResult'),
        paging: parsePaging($),
        counting: parseCounting($),
    }
}

export function parseVideoResult($: CheerioAPI, container: string | Cheerio<Element>) {
    const list = typeof container === 'string' ? $(`${container} li.videoblock`) : container.find('li.videoblock')

    const result = list.map((_, el) => {
        const item = $(el)
        const thumb = item.find('.linkVideoThumb').eq(0)
        const title = getAttribute<string>(thumb, 'title', '')
        const path = getAttribute<string>(thumb, 'href', '')
        // premium videos have no path
        if (path === 'javascript:void(0)') return null

        const url = urlcat(BASE_URL, path)
        const id = UrlParser.getVideoID(url)
        const img = item.find('img')
        const preview = getAttribute<string>(img, 'src', '')

        return {
            title,
            id,
            url,
            views: item.find('.views var').text(),
            duration: item.find('.duration').text(),
            hd: !!item.find('.hd-thumbnail').length,
            premium: !!item.find('.premiumIcon').length,
            freePremium: !!item.find('.marker-overlays .phpFreeBlock').length,
            preview,
        }
    }).get().filter(nonNullable)

    return result
}
