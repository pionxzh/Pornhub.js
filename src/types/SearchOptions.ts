import type { PornstarSearchPopularPeriod, PornstarSearchViewedPeriod, SearchPeriod, Segment, SexualOrientation, ThumbSize, VideoSearchPeriod, WebmasterSearchOrdering } from '.'
import type { AlbumSearchOrdering, GifSearchOrdering, PornstarListOrdering, PornstarSearchOrdering, RecommendedOrdering, VideoSearchOrdering } from './SearchOrdering'

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

export type PornstarListOptions = {
    gay?: boolean
    performerType?: 'pornstar' | 'amateur' | (string & {})
    gender?: 'male' | 'female' | 'm2f' | 'f2m' | (string & {})
    ethnicity?: 'asian' | 'black' | 'indian' | 'latin' | 'middle eastern' | 'mixed' | 'white' | 'other' | (string & {})
    tattoos?: boolean
    cup?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F-Z' | (string & {})
    piercings?: boolean
    hair?: 'auburn' | 'bald' | 'black' | 'blonde' | 'brown' | 'brunette' | 'grey' | 'red' | 'various' | 'other' | (string & {})
    breastType?: 'natural' | 'fake' | (string & {})
    ageFrom?: 18 | 20 | 30 | 40
    ageTo?: 20 | 30 | 40 | 99
    page?: number
} & ({
    order?: Exclude<PornstarListOrdering, 'Alphabetical' | 'Most Popular' | 'Most Viewed'>
} | {
    order: 'Alphabetical'
    letter?: 'num' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
} | {
    order: 'Most Popular'
    timeRange?: PornstarSearchPopularPeriod
} | {
    order: 'Most Viewed'
    timeRange?: PornstarSearchViewedPeriod
})

export type VideoSearchOptions = {
    page?: number
    hd?: boolean
    production?: 'all' | 'professional' | 'homemade'
    durationMin?: 10 | 20 | 30
    durationMax?: 10 | 20 | 30
    /** Category id */
    filterCategory?: number
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
}
