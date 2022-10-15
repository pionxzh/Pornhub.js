import type { Segment } from '.'

export interface VideoResponse {
    duration: string
    views: number
    video_id: string
    rating: number
    ratings: number
    title: string
    url: string
    default_thumb: string
    thumb: string
    publish_date: string
    thumbs: {
        size: string
        width: string
        height: string
        src: string
    }[]
    tags: {
        tag_name: string
    }[]
    pornstars: {
        pornstar_name: string
    }[]
    categories: {
        category: string
    }[]
    segment: Segment
}
