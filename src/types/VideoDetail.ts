import type { Segment } from '.'

export interface VideoDetail {
    duration: string
    views: number
    video_id: string
    vote: {
        up: number
        down: number
        total: number
        rating: number
    }
    title: string
    url: string
    default_thumb: string
    thumb: string
    publish_date: string
    thumbs: Array<{
        width: string
        height: string
        src: string
    }>
    tags: string[]
    pornstars: string[]
    categories: string[]
    segment: Segment
}
