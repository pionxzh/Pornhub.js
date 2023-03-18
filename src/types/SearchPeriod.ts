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
