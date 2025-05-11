import type { ChannelSearchPeriod, SearchPeriod, Segment, SexualOrientation, ThumbSize, VideoSearchPeriod, WebmasterSearchOrdering } from '.'
import type { AlbumSearchOrdering, ChannelSearchOrdering, GifSearchOrdering, PornstarSearchOrdering, RecommendedOrdering, VideoSearchOrdering } from './SearchOrdering'

export interface WebmasterSearchOptions {
    page?: number
    period?: SearchPeriod
    ordering?: WebmasterSearchOrdering
    thumbsize?: ThumbSize
    tags?: string[]
    stars?: string[]
    category?: string[]
}

export interface AlbumSearchOptions {
    page?: number
    order?: AlbumSearchOrdering
    verified?: boolean
    segments?: Segment | Segment[]
}

export interface GifSearchOptions {
    page?: number
    order?: GifSearchOrdering
    sexualOrientation?: SexualOrientation
}

export type ChannelSearchOptions = {
    page?: number
    order?: ChannelSearchOrdering
} & ({
    order?: Exclude<ChannelSearchOrdering, 'Most Video Views'>
} | {
    order: Extract<ChannelSearchOrdering, 'Most Video Views'>
    period?: ChannelSearchPeriod
})

export interface PornstarSearchOptions {
    page?: number
    order?: PornstarSearchOrdering
    sexualOrientation?: 'straight' | 'gay'
}

export type VideoSearchOptions = {
    page?: number
    hd?: boolean
    production?: 'all' | 'professional' | 'homemade'
    durationMin?: 10 | 20 | 30
    durationMax?: 10 | 20 | 30
    /** Category id */
    filterCategory?: number
    /**
     * Categories ids to exclude separated by hyphens
     * @example 5-90
     */
    excludeCategory?: string
    sexualOrientation?: 'straight' | 'gay'
} & ({
    order?: Exclude<VideoSearchOrdering, 'Most Viewed' | 'Top Rated'>
} | {
    order: Extract<VideoSearchOrdering, 'Most Viewed' | 'Top Rated'>
    period?: VideoSearchPeriod
})

export interface AutoCompleteOptions {
    token?: string
    sexualOrientation?: SexualOrientation
}

export interface RecommendedOptions {
    order?: RecommendedOrdering
    page?: number
    sexualOrientation?: 'straight' | 'gay'
}
