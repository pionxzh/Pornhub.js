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
    thumbs: Array<{
        size: string
        width: string
        height: string
        src: string
    }>
    tags: Array<{
        tag_name: string
    }>
    pornstars: Array<{
        pornstar_name: string
    }>
    categories: Array<{
        category: string
    }>
    segment: Segment
}
