import { Route } from '../../apis'
import { getCheerio } from '../../utils/cheerio'
import { UrlParser } from '../../utils/url'
import { removeComma } from '../../utils/utils'
import type { Engine } from '../../core/engine'
import type { CheerioAPI } from 'cheerio'

export interface PhotoPage {
    info: {
        title: string
        views: number
        rating: string
        albumID: string
        url: string
    }
    provider: {
        id: number
        username: string
        url: string
    }
    tags: string[]
}

export async function photoPage(engine: Engine, urlOrId: string): Promise<PhotoPage> {
    const id = UrlParser.getPhotoID(urlOrId)
    const url = Route.photoPage(id)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return {
        info: parsePhoto($),
        provider: parseProvider($),
        tags: parseTag($),
    }
}

function parsePhoto($: CheerioAPI) {
    const photoWrapper = $('div#photoWrapper')
    const $img = photoWrapper.find('img')
    const title = $img.attr('alt') || ''
    const url = $img.attr('src') || ''
    const albumID = photoWrapper.data('album-id')?.toString() || ''
    const rating = `${photoWrapper.find('span#votePercentageNumber').text()}%` || ''

    const viewsText = photoWrapper.find('section#photoInfoSection strong').text()
    const views = Number.parseInt(removeComma(viewsText)) || 0

    return {
        title,
        views,
        rating,
        albumID,
        url,
    }
}

function parseProvider($: CheerioAPI) {
    const $user = $('div#userInformation div.usernameWrap')

    const id = $user.data('userid') as number
    const username = $user.find('a').text()
    const url = $user.find('a').attr('href') || ''

    return { id, username, url }
}

function parseTag($: CheerioAPI) {
    const $list = $('ul.tagList a.tagText')
    return $list.map(idx => $list.eq(idx).text()).get()
}
