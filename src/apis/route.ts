import urlcat from 'urlcat'
import { AlbumOrderingMapping, GifOrderingMapping, PornstarListOrderingMapping, PornstarOrderingMapping, PornstarPopularPeriodMapping, PornstarViewedPeriodMapping, RecommendedOrderingMapping, VideoListOrderingMapping, VideoOrderingMapping, VideoSearchPeriodMapping } from '../types'
import { CountryMapping } from '../types/Country'
import { BASE_URL } from '../utils/constant'
import { dashify, searchify } from '../utils/string'
import type { AlbumSearchOptions, AutoCompleteOptions, GifSearchOptions, PornstarSearchOptions, RecommendedOptions, VideoSearchOptions, WebmasterSearchOptions } from '../types'
import type { PornstarListOptions, VideoListOptions } from '../types/ListOptions'

export const Route = {
    /**
     * @url https://www.pornhub.com/
     */
    mainPage() {
        return `${BASE_URL}/`
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
    /**
     * @url https://www.pornhub.com/album/7529441
     */
    albumPage(id: string) {
        return urlcat(BASE_URL, '/album/:id', { id })
    },
    /**
     * @url https://www.pornhub.com/photo/833578021
     */
    photoPage(id: string) {
        return urlcat(BASE_URL, '/photo/:id', { id })
    },
    videoPage(id: string) {
        return urlcat(BASE_URL, '/view_video.php', { viewkey: id })
    },
    /**
     * @url https://www.pornhub.com/pornstar/eva-elfie
     */
    pornstarPage(name: string) {
        return urlcat(BASE_URL, '/pornstar/:name', { name })
    },
    /**
     * @url https://www.pornhub.com/model/luna-okko
     */
    modelPage(name: string) {
        return urlcat(BASE_URL, '/model/:name', { name })
    },
    /**
     * @url https://www.pornhub.com/model/luna-okko/videos
     */
    modelVideosPage(name: string, page: number) {
        return urlcat(BASE_URL, '/model/:name/videos', { name, page })
    },
    /**
     * @url https://www.pornhub.com/channels/brazzers
     */
    channelPage(name: string) {
        return urlcat(BASE_URL, '/channels/:name', { name })
    },
    /**
     * @url https://www.pornhub.com/random
     */
    randomPage() {
        return urlcat(BASE_URL, '/random')
    },
    /**
     * @url https://www.pornhub.com/recommended
     */
    recommendedPage({
        order = 'Most Relevant',
        page = 1,
        sexualOrientation = 'straight',
    }: RecommendedOptions) {
        const orientation = sexualOrientation === 'straight' ? undefined : sexualOrientation
        const pathTemplate = orientation
            ? '/:orientation/recommended'
            : '/recommended'
        return urlcat(BASE_URL, pathTemplate, {
            orientation,
            ...(order !== 'Most Relevant' && { o: RecommendedOrderingMapping[order] }),
            ...(page !== 1 && { page }),
        })
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
            ...(page !== 1 && { page }),
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
        const orientation = sexualOrientation === 'straight' ? undefined : sexualOrientation
        const pathTemplate = orientation
            ? '/:orientation/gifs/search'
            : '/gifs/search'
        return urlcat(BASE_URL, pathTemplate, {
            orientation,
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
        sexualOrientation = 'straight',
    }: PornstarSearchOptions) {
        const o = PornstarOrderingMapping[order]
        const orientation = sexualOrientation === 'straight' ? undefined : sexualOrientation
        const pathTemplate = orientation
            ? '/:orientation/pornstars/search'
            : '/pornstars/search'
        return urlcat(BASE_URL, pathTemplate, {
            orientation,
            search: searchify(keyword),
            ...(page !== 1 && { page }),
            ...(o && { o }),
        })
    },
    /**
     * @url https://www.pornhub.com/video/search?search=random
     */
    videoSearch(keyword: string, param: VideoSearchOptions) {
        const {
            page = 1,
            order = 'Most Relevant',
            hd = false,
            production = 'all',
            durationMin,
            durationMax,
            filterCategory,
            sexualOrientation = 'straight',
        } = param
        const o = VideoOrderingMapping[order]
        const orientation = sexualOrientation === 'straight' ? undefined : sexualOrientation
        const pathTemplate = orientation
            ? '/:orientation/video/search'
            : '/video/search'
        return urlcat(BASE_URL, pathTemplate, {
            orientation,
            search: searchify(keyword),
            ...(page !== 1 && { page }),
            ...(o && { o }),
            ...(hd && { hd: '1' }),
            ...(production !== 'all' && { p: production }),
            ...(durationMin && { min_duration: durationMin }),
            ...(durationMax && { max_duration: durationMax }),
            ...(filterCategory && { filter_category: filterCategory }),
            ...((param.order === 'Most Viewed' || param.order === 'Top Rated')
                && param.period && param.period !== 'alltime' && { t: VideoSearchPeriodMapping[param.period] }),
        })
    },
    /**
     * @url https://www.pornhub.com/video
     */
    videoList(param: VideoListOptions) {
        const {
            page = 1,
            order = 'Featured Recently',
            hd = false,
            production = 'all',
            durationMin,
            durationMax,
            filterCategory,
            sexualOrientation = 'straight',
        } = param
        const pathTemplate = sexualOrientation === 'transgender'
            ? 'transgender'
            : sexualOrientation === 'gay'
                ? '/gayporn'
                : '/video'
        const o = VideoListOrderingMapping[order]
        return urlcat(BASE_URL, pathTemplate, {
            ...(filterCategory && { c: filterCategory }),
            ...(production !== 'all' && { p: production }),
            ...(o && { o }),
            ...((param.order === 'Most Viewed' || param.order === 'Top Rated')
                && param.period && param.period !== 'alltime' && { t: VideoSearchPeriodMapping[param.period] }),
            ...(param.order === 'Hottest' && param.country && param.country !== 'World' && { cc: CountryMapping[param.country] }),
            ...(durationMin && { min_duration: durationMin }),
            ...(durationMax && { max_duration: durationMax }),
            ...(hd && { hd: '1' }),
            ...(page !== 1 && { page }),
        })
    },
    /**
     * @url https://www.pornhub.com/pornstars
     */
    pornstarList(param: PornstarListOptions) {
        const {
            gay = false,
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
        return urlcat(BASE_URL, gay ? '/gay/pornstars' : '/pornstars', {
            ...(performerType && { performerType }),
            ...(gender && { gender }),
            ...(ethnicity && { ethnicity }),
            ...(typeof piercings === 'boolean' && { piercings: getYesNo(piercings) }),
            ...(age !== '18-99' && { age }),
            ...(cup && { cup: cup.toLowerCase() }),
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
