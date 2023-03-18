import type { CheerioAPI } from 'cheerio'
import urlcat from 'urlcat'
import type { Engine } from '../../core/engine'
import type { Paging, PornstarListOptions } from '../../types'
import { Route } from '../../apis'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { parsePaging } from './base'

export interface PornstarListResult {
    name: string
    url: string
    views: string
    videoNum: number
    rank: number
    photo: string
    verified: boolean
    awarded: boolean
}

export async function pornstarList(engine: Engine, options: PornstarListOptions): Promise<{
    data: PornstarListResult[]
    paging: Paging
}> {
    const url = Route.pornstarList(options)
    const html = await engine.request.raw(url)
    const $ = getCheerio(html)

    return {
        data: parseResult($),
        paging: parsePaging($),
    }
}

function parseResult($: CheerioAPI) {
    const list = $('#popularPornstars li.performerCard')
    const result = list.map((_, el) => {
        const item = $(el)

        const name = item.find('.performerCardName').text().trim()
        const path = getAttribute<string>(item.find('a.title'), 'href', '')
        const url = urlcat(BASE_URL, path)
        const views = item.find('.viewsNumber').text().replace('Views', '').trim() || '0'
        const videoNum = parseInt(item.find('.videosNumber').text().replace('Videos', '')) || 0
        const rank = parseInt(item.find('.rank_number').text()) || 0
        const img = item.find('img')
        const photo = getDataAttribute<string>(img, 'thumb_url', '')
        const verified = item.find('.verifiedPornstar').length > 0
        const awarded = item.find('.trophyPornStar').length > 0

        return {
            name,
            url,
            views,
            videoNum,
            rank,
            photo,
            verified,
            awarded,
        }
    }).get()

    return result
}
