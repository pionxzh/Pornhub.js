import { WebmasterRoute } from '../route'
import { videoTransform } from './utils/videoTransform'
import type { Engine } from '../../core/engine'
import type { VideoDetail, VideoResponse, WebmasterSearchOptions } from '../../types'

export interface WebmasterSearch {
    videos: VideoResponse[]
}

export async function search(engine: Engine, keyword: string, options: WebmasterSearchOptions): Promise<VideoDetail[]> {
    try {
        const res = await engine.request.get(WebmasterRoute.search(keyword, options))
        const result = await res.json() as WebmasterSearch
        return result.videos.map(x => videoTransform(x))
    }
    catch (err) {
        console.error(err)
        return []
    }
}
