import type { Country } from './Country'
import type { PornstarListOrdering, VideoListOrdering } from './SearchOrdering'
import type { PornstarSearchPopularPeriod, PornstarSearchViewedPeriod, VideoSearchPeriod } from './SearchPeriod'
import type { SexualOrientation } from './SexualOrientation'

export type VideoListOptions = {
    page?: number
    hd?: boolean
    production?: 'all' | 'professional' | 'homemade'
    durationMin?: 10 | 20 | 30
    durationMax?: 10 | 20 | 30
    /** Category id */
    filterCategory?: number
    sexualOrientation?: SexualOrientation
} & ({
    order?: Exclude<VideoListOrdering, 'Most Viewed' | 'Top Rated' | 'Hottest'>
} | {
    order: Extract<VideoListOrdering, 'Most Viewed' | 'Top Rated'>
    period?: VideoSearchPeriod
} | {
    order: Extract<VideoListOrdering, 'Hottest'>
    country?: Country
})

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

export interface ModelVideoListOptions {
    page?: number
}
