export type WebmasterSearchOrdering = 'newest' | 'mostviewed' | 'rating'

export type VideoSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated' | 'Longest'

export type GifSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated'

export type ChannelSearchOrdering = 'Most Popular' | 'Most Relevant' | 'Trending' | 'Most Subscribers' | 'Most Recently Created' | 'Most Recently Updated' | 'Most Videos' | 'Most Video Views'

export type AlbumSearchOrdering = 'Most Relevant' | 'Most Recent' | 'Most Viewed' | 'Top Rated'

export type PornstarSearchOrdering = 'Most Relevant' | 'Most Popular' | 'Most Viewed' | 'No. of Video'

export type VideoListOrdering = 'Featured Recently' | 'Most Viewed' | 'Top Rated' | 'Hottest' | 'Longest' | 'Newest'

export type PornstarListOrdering = 'Most Popular' | 'Most Viewed' | 'Top Trending' | 'Most Subscribed' | 'Alphabetical' | 'No. of Videos' | 'Random'

export type RecommendedOrdering = 'Most Relevant' | 'Most Recent'

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

export const ChannelSearchOrderingMapping: Record<ChannelSearchOrdering, string> = {
    'Most Popular': 'rk',
    'Most Relevant': 'al',
    'Trending': 'tr',
    'Most Subscribers': 'sub',
    'Most Recently Created': 'mrj',
    'Most Recently Updated': 'mru',
    'Most Videos': 'nv',
    'Most Video Views': 'mv',
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

export const VideoListOrderingMapping: Record<VideoListOrdering, string> = {
    'Featured Recently': '',
    'Most Viewed': 'mv',
    'Top Rated': 'tr',
    'Hottest': 'ht',
    'Longest': 'lg',
    'Newest': 'cm',
}

export const PornstarListOrderingMapping: Record<PornstarListOrdering, string> = {
    'Most Popular': '',
    'Most Viewed': 'mv',
    'Top Trending': 't',
    'Most Subscribed': 'ms',
    'Alphabetical': 'a',
    'No. of Videos': 'nv',
    'Random': 'r',
}

export const RecommendedOrderingMapping: Record<RecommendedOrdering, string> = {
    'Most Relevant': '',
    'Most Recent': 'time',
}
