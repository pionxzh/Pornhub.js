import type { VideoListOrdering } from './SearchOrdering'
import type { VideoSearchPeriod } from './SearchPeriod'

export type VideoListOptions = {
    page?: number
    hd?: boolean
    production?: 'all' | 'professional' | 'homemade'
    durationMin?: 10 | 20 | 30
    durationMax?: 10 | 20 | 30
    /** Category id */
    filterCategory?: number
} & ({
    order?: Exclude<VideoListOrdering, 'Most Viewed' | 'Top Rated'>
} | {
    order: Extract<VideoListOrdering, 'Most Viewed' | 'Top Rated'>
    period?: VideoSearchPeriod
})
