import urlcat from 'urlcat'
import { Route } from '../../apis'
import { getCheerio, getDataAttribute } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { removeComma } from '../../utils/utils'
import { parsePaging } from './base'
import type { ChannelSearchOptions, Paging } from '../../types'
import type { Engine } from '../../core/engine'
import type { CheerioAPI } from 'cheerio'

export interface ChannelSearchResult {
    name: string
    url: string
    subscribers: number
    videoNum: number
    views: number
    rank: number
    photo: string
}

export async function channelSearch(engine: Engine, keyword: string, options: ChannelSearchOptions): Promise<{
    data: ChannelSearchResult[]
    paging: Paging
}> {
    const url = Route.channelSearch(keyword, options)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return {
        data: parseResult($),
        paging: parsePaging($),
    }
}

function parseResult($: CheerioAPI) {
    const $list = $('ul.channelGridWrapper > li > .channelsWrapper')
    const result = $list.map((_, el) => {
        const item = $(el)
        const imgWrapper = item.find('.imgWrapper')
        const description = item.find('.description')

        const rank = Number.parseInt(imgWrapper.find('.rank').text().replace('Rank', '').trim())
        const descriptionContainer = description.find('.descriptionContainer > ul')
        const descriptionGrid = descriptionContainer.children('li')
        if (descriptionContainer.children('li').length !== 4) {
            console.warn(`[Channel] descriptionGrid length is ${descriptionGrid.length} instead of 4`)
            return null
        }

        const photo = description.find('.avatar img')
        const name = descriptionContainer.find('ul > li:nth-child(1) > a').text()
        const url = descriptionContainer.find('ul > li:nth-child(1) > a').attr('href')
        const subscribersText = descriptionContainer.find('ul > li:nth-child(2) > span').text().trim()
        const videoNumText = descriptionContainer.find('ul > li:nth-child(3) > span').text().trim()
        const viewsText = descriptionContainer.find('ul > li:nth-child(4) > span').text().trim()

        return {
            name,
            url: url ? urlcat(BASE_URL, url) : '',
            subscribers: Number.parseInt(removeComma(subscribersText)),
            videoNum: Number.parseInt(removeComma(videoNumText)),
            views: Number.parseInt(removeComma(viewsText)),
            rank,
            photo: getDataAttribute<string>(photo, 'thumb_url', ''),
        }
    }).get()

    return result
}
