import type { CheerioAPI } from 'cheerio'
import urlcatM from 'urlcat'
import type { Engine } from '../../core/engine'
import type { Counting, Paging, VideoSearchOptions } from '../../types'
import { Route } from '../../apis'
import { getAttribute, getCheerio } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { parseCounting, parsePaging } from './base'

const urlcat = (urlcatM as unknown as { default: typeof urlcatM }).default ?? urlcatM

export interface VideoSearchResult {
    title: string
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

export async function videoSearch(engine: Engine, keyword: string, options: VideoSearchOptions): Promise<{
    data: VideoSearchResult[]
    paging: Paging
    counting: Counting
}> {
    const url = Route.videoSearch(keyword, options)
    const html = await engine.request.raw(url)
    const $ = getCheerio(html)

    return {
        data: parseResult($),
        paging: parsePaging($),
        counting: parseCounting($),
    }
}

function parseResult($: CheerioAPI) {
    const list = $('#videoSearchResult li.videoBox')

    const result = list.map((_, el) => {
        const item = $(el)
        const thumb = item.find('.linkVideoThumb').eq(0)
        const title = getAttribute<string>(thumb, 'title', '')
        const path = getAttribute<string>(thumb, 'href', '')
        const img = item.find('img')
        const preview = getAttribute<string>(img, 'src', '')

        return {
            title,
            url: urlcat(BASE_URL, path),
            views: item.find('.videoDetailsBlock .views var').text(),
            duration: item.find('.duration').text(),
            hd: !!item.find('.hd-thumbnail').length,
            premium: !!item.find('.premiumIcon').length,
            freePremium: !!item.find('.marker-overlays .phpFreeBlock').length,
            preview,
        }
    }).get()

    return result
}
