import type { Engine } from '../../core/engine'
import { WebmasterRoute } from '../route'
import type { VideoDetail, VideoResponse, WebmasterSearchOptions } from '../../types'
import { videoTransform } from './utils/videoTransform'

export interface WebmasterSearch {
    videos: VideoResponse[]
}

export async function search(engine: Engine, keyword: string, options: WebmasterSearchOptions): Promise<VideoDetail[]> {
    try {
        const result = await engine.request.get<WebmasterSearch>(WebmasterRoute.search(keyword, options))
        return result.videos.map(x => videoTransform(x))
    }
    catch (err) {
        console.error(err)
        return []
    }
}
