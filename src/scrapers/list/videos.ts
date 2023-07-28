import { Route } from '../../apis'
import { getCheerio } from '../../utils/cheerio'
import { parseCounting, parsePaging } from '../search/base'
import { parseVideoResult } from '../search/video'
import type { Engine } from '../../core/engine'
import type { Counting, Paging } from '../../types'
import type { VideoListOptions } from '../../types/ListOptions'
import type { VideoListResult } from '../search/video'

export async function videoList(engine: Engine, options: VideoListOptions): Promise<{
    data: VideoListResult[]
    paging: Paging
    counting: Counting
}> {
    const url = Route.videoList(options)
    const res = await engine.request.get(url)
    const html = await res.text()
    const $ = getCheerio(html)

    return {
        data: parseVideoResult($, '#videoCategory'),
        paging: parsePaging($),
        counting: parseCounting($),
    }
}
