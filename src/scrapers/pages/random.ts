import { Route } from '../../apis'
import { getCheerio } from '../../utils/cheerio'
import { UrlParser } from '../../utils/url'
import { parseByDom } from './video'
import type { VideoPage } from './video'
import type { Engine } from '../../core/engine'

export async function randomPage(engine: Engine): Promise<VideoPage> {
    const url = Route.randomPage()
    const response = await engine.request.fetch(url, { follow: 3 })
    const redirectUrl = response.url
    const id = UrlParser.getVideoID(redirectUrl)
    const html = await response.text()
    const $ = getCheerio(html)

    return {
        id,
        url: Route.videoPage(id),
        ...parseByDom(html, $),
    }
}
