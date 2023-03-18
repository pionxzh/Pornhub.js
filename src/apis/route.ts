import urlcat from 'urlcat'
import { BASE_URL } from '../utils/constant'
import { dashify, searchify } from '../utils/string'
import type { AlbumSearchOptions, AutoCompleteOptions, GifSearchOptions, PornstarListOptions, PornstarSearchOptions, VideoSearchOptions, WebmasterSearchOptions } from '../types'
import { AlbumOrderingMapping, GifOrderingMapping, PornstarListOrderingMapping, PornstarOrderingMapping, PornstarPopularPeriodMapping, PornstarViewedPeriodMapping, VideoOrderingMapping } from '../types'

export const Route = {
    mainPage() {
        return BASE_URL
    },
    /**
     * @url https://www.pornhub.com/front/authenticate
     */
    authenticate() {
        return urlcat(BASE_URL, '/front/authenticate')
    },
    /**
     * @url https://www.pornhub.com/user/logout
     */
    logout(token: string) {
        return urlcat(BASE_URL, '/user/logout', { token })
    },
    /**
     * @url https://www.pornhub.com/video/search_autocomplete?q=random&orientation=straight&pornstars=1&alt=0&token=xxx
     */
    autocomplete(keyword: string, {
        token,
        sexualOrientation = 'straight',
    }: AutoCompleteOptions) {
        return urlcat(BASE_URL, '/video/search_autocomplete', {
            q: keyword,
            orientation: sexualOrientation,
            pornstars: true,
            token,
            alt: 0,
        })
    },

    albumPage(id: string) {
        return urlcat(BASE_URL, '/album/:id', { id })
    },
    photoPage(id: string) {
        return urlcat(BASE_URL, '/photo/:id', { id })
    },
    videoPage(id: string) {
        return urlcat(BASE_URL, '/view_video.php', { viewkey: id })
    },
    pornstarPage(name: string) {
        return urlcat(BASE_URL, '/pornstar/:name', { name })
    },
    modelPage(name: string) {
        return urlcat(BASE_URL, '/model/:name', { name })
    },
    channelPage(name: string) {
        return urlcat(BASE_URL, '/channels/:name', { name })
    },

    /**
     * @url https://www.pornhub.com/albums/female-straight-uncategorized?search=random
     */
    albumSearch(keyword: string, {
        page = 1,
        segments = 'female-straight-uncategorized',
        order = 'Most Relevant',
        verified = false,
    }: AlbumSearchOptions) {
        const o = AlbumOrderingMapping[order]
        return urlcat(BASE_URL, '/albums/:segment', {
            segment: dashify(segments),
            search: searchify(keyword),
            page,
            ...(o && { o }),
            ...(verified && { verified: '1' }),
        })
    },
    /**
     * @url https://www.pornhub.com/gifs/search?search=xxx
     */
    gifSearch(keyword: string, {
        page = 1,
        order = 'Most Relevant',
        sexualOrientation = 'straight',
    }: GifSearchOptions) {
        const o = GifOrderingMapping[order]
        const pathTemplate = sexualOrientation === 'straight'
            ? '/gifs/search'
            : '/:sexualOrientation/gifs/search'
        return urlcat(BASE_URL, pathTemplate, {
            ...(sexualOrientation !== 'straight' && { sexualOrientation }),
            search: searchify(keyword),
            ...(page !== 1 && { page }),
            ...(o && { o }),
        })
    },
    /**
     * @url https://www.pornhub.com/pornstars/search?search=hot
     */
    pornstarSearch(keyword: string, {
        page = 1,
        order = 'Most Relevant',
    }: PornstarSearchOptions) {
        const o = PornstarOrderingMapping[order]
        return urlcat(BASE_URL, '/pornstars/search', {
            search: searchify(keyword),
            ...(page !== 1 && { page }),
            ...(o && { o }),
        })
    },
    /**
     * @url https://www.pornhub.com/video/search?search=random
     */
    videoSearch(keyword: string, {
        page = 1,
        order = 'Most Relevant',
        hd = false,
        production = 'all',
        durationMin,
        durationMax,
        filterCategory,
    }: VideoSearchOptions) {
        const o = VideoOrderingMapping[order]
        return urlcat(BASE_URL, '/video/search', {
            search: searchify(keyword),
            ...(page !== 1 && { page }),
            ...(o && { o }),
            ...(hd && { hd: '1' }),
            ...(production !== 'all' && { p: production }),
            ...(durationMin && { min_duration: durationMin }),
            ...(durationMax && { max_duration: durationMax }),
            ...(filterCategory && { filter_category: filterCategory }),
        })
    },
    /**
     * @url https://www.pornhub.com/pornstars
     */
    pornstarList(param: PornstarListOptions) {
        const {
            performerType,
            gender,
            ethnicity,
            tattoos,
            cup,
            piercings,
            hair,
            breastType,
            ageFrom = 18,
            ageTo = 99,
            order = 'Most Popular',
            page = 1,
        } = param
        const getYesNo = (v: boolean) => v ? 'yes' : 'no'
        const o = PornstarListOrderingMapping[order]
        const age = `${ageFrom}-${ageTo}`
        return urlcat(BASE_URL, '/pornstars', {
            ...(performerType && { performerType }),
            ...(gender && { gender }),
            ...(ethnicity && { ethnicity }),
            ...(typeof piercings === 'boolean' && { piercings: getYesNo(piercings) }),
            ...(age !== '18-99' && { age }),
            ...(cup && { cup }),
            ...(breastType && { breastType }),
            ...(hair && { hair }),
            ...(typeof tattoos === 'boolean' && { tattoos: getYesNo(tattoos) }),
            ...(o && { o }),
            ...(param.order === 'Alphabetical' && { letter: (param.letter ?? 'a').toLowerCase() }),
            ...(param.order === 'Most Popular' && param.timeRange && param.timeRange !== 'monthly' && {
                timeRange: PornstarPopularPeriodMapping[param.timeRange],
            }),
            ...(param.order === 'Most Viewed' && param.timeRange && param.timeRange !== 'alltime' && {
                timeRange: PornstarViewedPeriodMapping[param.timeRange],
            }),
            ...(page !== 1 && { page }),
        })
    },

}

const WebmasterBaseUrl = urlcat(BASE_URL, '/webmasters')

export const WebmasterRoute = {
    isVideoActive(id: string) {
        return urlcat(WebmasterBaseUrl, '/is_video_active', { id })
    },
    categories() {
        return urlcat(WebmasterBaseUrl, '/categories')
    },
    deletedVideos(page: number) {
        return urlcat(WebmasterBaseUrl, '/deleted_videos', { page })
    },
    video_embed_code(id: string) {
        return urlcat(WebmasterBaseUrl, '/video_embed_code', { id })
    },
    stars_detailed() {
        return urlcat(WebmasterBaseUrl, '/stars_detailed')
    },
    stars() {
        return urlcat(WebmasterBaseUrl, '/stars')
    },
    tags(letter: string) {
        return urlcat(WebmasterBaseUrl, '/tags', { list: letter })
    },
    video_by_id(id: string, thumbsize: string) {
        return urlcat(WebmasterBaseUrl, '/video_by_id', { id, thumbsize })
    },
    search(keyword: string, options: WebmasterSearchOptions = {}) {
        const query = {
            'search': keyword.split(' ').join('+'),
            'page': options.page,
            'period': options.period,
            'ordering': options.ordering,
            'thumbsize': options.thumbsize,
            'tags[]': options.tags?.join(','),
            'stars[]': options.stars?.join(','),
            'category': options.category?.join(','),
        }
        return urlcat(WebmasterBaseUrl, '/search', query)
    },
}
