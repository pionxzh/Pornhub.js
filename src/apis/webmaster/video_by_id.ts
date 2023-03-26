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
    const result = await engine.request.get<WebmasterVideoById>(WebmasterRoute.video_by_id(id, thumbsize))
    return videoTransform(result.video)
}
