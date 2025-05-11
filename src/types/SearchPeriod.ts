export type SearchPeriod = 'weekly' | 'monthly' | 'alltime'

export type PornstarSearchPopularPeriod = 'weekly' | 'monthly' | 'yearly'

export type PornstarSearchViewedPeriod = 'daily' | 'weekly' | 'monthly' | 'alltime'

export const PornstarPopularPeriodMapping: Record<PornstarSearchPopularPeriod, string> = {
    weekly: 'w',
    monthly: '',
    yearly: 'a',
}

export const PornstarViewedPeriodMapping: Record<PornstarSearchViewedPeriod, string> = {
    daily: 't',
    weekly: 'w',
    monthly: 'm',
    alltime: '',
}

export type ChannelSearchPeriod = 'daily' | 'weekly' | 'monthly' | 'alltime'

export const ChannelSearchPeriodMapping: Record<ChannelSearchPeriod, string> = {
    daily: 't',
    weekly: 'w',
    monthly: 'm',
    alltime: '',
}

export type VideoSearchPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'alltime'

export const VideoSearchPeriodMapping: Record<VideoSearchPeriod, string> = {
    daily: 't',
    weekly: 'w',
    monthly: 'm',
    yearly: 'y',
    alltime: '',
}
