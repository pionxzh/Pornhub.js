import { Route } from '../../apis'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { UrlParser } from '../../utils/url'
import type { Engine } from '../../core/engine'
import type { CheerioAPI } from 'cheerio'

export interface AlbumPage {
    title: string
    photos: Array<{
        url: string
        views: string
        rating: string
        preview: string
    }>
    provider: {
        id: string
        username: string
        url: string
    }
    tags: string[]
}

export async function albumPage(engine: Engine, urlOrId: string): Promise<AlbumPage> {
    const id = UrlParser.getAlbumID(urlOrId)
    const url = Route.albumPage(id)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return {
        title: $('h1.photoAlbumTitleV2').text().trim(),
        photos: parsePhotos($),
        provider: parseProvider($),
        tags: parseTag($),
    }
}

function parsePhotos($: CheerioAPI) {
    const $list = $('ul.photosAlbumsListing li.photoAlbumListContainer div.photoAlbumListBlock')
    const photos = $list.map((_, el) => {
        const item = $(el)
        const url = `${BASE_URL}${item.find('a').attr('href')}` || ''
        const views = item.find('.album-views').text().replace('Views: ', '').trim()
        const rating = item.find('.album-rating').text()
        const preview = getDataAttribute<string>(item, 'bkg', '')
        return { url, views, rating, preview }
    }).get()

    return photos
}

function parseProvider($: CheerioAPI) {
    const $user = $('div.pfileInfoBox div.usernameWrap')

    const id = getDataAttribute<string>($user, 'userid', '')
    const username = $user.find('a').text()
    const url = getAttribute<string>($user.find('a'), 'href', '')

    return { id, username, url }
}

function parseTag($: CheerioAPI) {
    const $list = $('div.tagContainer > a')
    return $list.map((_, el) => $(el).text().trim()).get()
}
