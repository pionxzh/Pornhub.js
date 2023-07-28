import { Route } from '../../apis'
import { getCheerio } from '../../utils/cheerio'
import { parsePaging } from '../search/base'
import { parseVideoResult } from '../search/video'
import type { Engine } from '../../core/engine'
import type { Paging } from '../../types'
import type { RecommendedOptions } from '../../types/SearchOptions'
import type { VideoListResult } from '../search/video'

export async function recommended(engine: Engine, options: RecommendedOptions): Promise<{
    data: VideoListResult[]
    paging: Paging
}> {
    const url = Route.recommendedPage(options)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return {
        data: parseVideoResult($, '.recommendedVideosContainer'),
        paging: parsePaging($),
    }
}
