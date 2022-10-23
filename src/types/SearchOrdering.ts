export type WebmasterSearchOrdering = 'newest' | 'mostviewed' | 'rating'

export type VideoSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated' | 'Longest'

export type GifSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated'

export type AlbumSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated'

export type PornstarSearchOrdering = 'Most Relevant' | 'Most Popular' | 'Most Viewed' | 'No. of Video'

export const VideoOrderingMapping: Record<VideoSearchOrdering, string> = {
    'Most Relevant': '',
    'Most Recent': 'mr',
    'Most Viewed': 'mv',
    'Top Rated': 'tr',
    'Longest': 'lg',
}

export const GifOrderingMapping: Record<GifSearchOrdering, string> = {
    'Most Relevant': '',
    'Most Recent': 'mr',
    'Most Viewed': 'mv',
    'Top Rated': 'tr',
}

export const AlbumOrderingMapping: Record<AlbumSearchOrdering, string> = {
    'Most Relevant': '',
    'Most Recent': 'mr',
    'Most Viewed': 'mv',
    'Top Rated': 'tr',
}

export const PornstarOrderingMapping: Record<PornstarSearchOrdering, string> = {
    'Most Relevant': '',
    'Most Popular': 'mp',
    'Most Viewed': 'mv',
    'No. of Video': 'nv',
}
