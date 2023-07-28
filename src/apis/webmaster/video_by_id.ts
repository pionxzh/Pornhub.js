import { UrlParser } from '../../utils/url'
import { WebmasterRoute } from '../route'
import { videoTransform } from './utils/videoTransform'
import type { Engine } from '../../core/engine'
import type { ThumbSize, VideoDetail, VideoResponse } from '../../types'

export interface WebmasterVideoById {
    video: VideoResponse
}

export async function video_by_id(engine: Engine, urlOrId: string, thumbsize: ThumbSize = 'large'): Promise<VideoDetail> {
    const id = UrlParser.getVideoID(urlOrId)
    const res = await engine.request.get(WebmasterRoute.video_by_id(id, thumbsize))
    const result = await res.json() as WebmasterVideoById
    return videoTransform(result.video)
}
