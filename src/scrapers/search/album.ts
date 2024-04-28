import { Route } from '../../apis'
import { getAttribute, getCheerio, getDataAttribute } from '../../utils/cheerio'
import { BASE_URL } from '../../utils/constant'
import { parseCounting, parsePaging } from './base'
import type { Engine } from '../../core/engine'
import type { AlbumSearchOptions, Counting, Paging } from '../../types'
import type { CheerioAPI } from 'cheerio'

export interface AlbumSearchResult {
    title: string
    url: string
    rating: string
    preview: string
}

export async function albumSearch(engine: Engine, keyword: string, options: AlbumSearchOptions): Promise<{
    data: AlbumSearchResult[]
    paging: Paging
    counting: Counting
}> {
    const url = Route.albumSearch(keyword, options)
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
    const $list = $('ul#photosAlbumsSection li.photoAlbumListContainer div.photoAlbumListBlock')
    const result = $list.map((_, el) => {
        const item = $(el)

        const title = getAttribute<string>(item, 'title', '')
        const url = `${BASE_URL}${item.find('a').attr('href')}`
        const rating = item.find('.album-photo-percentage').text()
        const preview = getDataAttribute<string>(item, 'bkg')
            || getAttribute<string>(item, 'style', '').match(/url\("(.+)"\)/)?.[1]
            || ''
        return { title, url, rating, preview }
    }).get()

    return result
}
