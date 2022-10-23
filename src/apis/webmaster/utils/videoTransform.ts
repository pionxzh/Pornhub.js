import type { VideoDetail, VideoResponse } from '../../../types'

export function videoTransform(response: VideoResponse): VideoDetail {
    const {
        duration,
        views,
        video_id,
        rating,
        ratings,
        title,
        url,
        default_thumb,
        thumb,
        publish_date,
        thumbs,
        tags,
        pornstars,
        categories,
        segment,
    } = response

    // vote
    const total = ratings
    const up = Math.round(total * rating / 100)
    const down = total - up
    const vote = { up, down, total, rating: Math.round(rating * 100) / 100 }

    return {
        duration,
        views,
        video_id,
        vote,
        title,
        url,
        default_thumb,
        thumb,
        publish_date,
        thumbs: thumbs.map(({ width, height, src }) => ({ width, height, src })),
        tags: tags.map(x => x.tag_name),
        pornstars: pornstars.map(x => x.pornstar_name),
        categories: categories.map(x => x.category),
        segment,
    }
}
