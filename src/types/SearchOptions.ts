import type { AlbumSearchOrdering, GifSearchOrdering, PornstarSearchOrdering, VideoSearchOrdering } from './SearchOrdering'
import type { SearchPeriod, Segment, SexualOrientation, ThumbSize, WebmasterSearchOrdering } from '.'

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

export interface PornstarSearchOptions {
    page?: number
    order?: PornstarSearchOrdering
}

export interface VideoSearchOptions {
    page?: number
    order?: VideoSearchOrdering
    hd?: boolean
    production?: 'all' | 'professional' | 'homemade'
    durationMin?: 10 | 20 | 30
    durationMax?: 10 | 20 | 30
    /** Category id */
    filterCategory?: number
}

export interface AutoCompleteOptions {
    token?: string
    sexualOrientation?: SexualOrientation
}
