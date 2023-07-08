import { Route, getMainPage, login, logout } from './apis'
import { getAutoComplete } from './apis/autoComplete'
import { getToken } from './apis/getToken'
import { Engine } from './core/engine'
import { WebMaster } from './core/webmaster'
import { pornstarList } from './scrapers/list/pornstars'
import { videoList } from './scrapers/list/videos'
import { albumPage } from './scrapers/pages/album'
import { modelPage } from './scrapers/pages/model'
import { photoPage } from './scrapers/pages/photo'
import { pornstarPage } from './scrapers/pages/pornstar'
import { randomPage } from './scrapers/pages/random'
import { recommended } from './scrapers/pages/recommended'
import { videoPage } from './scrapers/pages/video'
import { albumSearch } from './scrapers/search/album'
import { gifSearch } from './scrapers/search/gif'
import { modelSearch } from './scrapers/search/model'
import { pornstarSearch } from './scrapers/search/pornstar'
import { videoSearch } from './scrapers/search/video'
import type { AlbumSearchOptions, AutoCompleteOptions, GifSearchOptions, PornstarListOptions, PornstarSearchOptions, RecommendedOptions, VideoSearchOptions } from './types'
import type { VideoListOptions } from './types/ListOptions'
import type { RequestInit } from 'node-fetch'

export * from './types'
export * from './utils/error'
export type { AlbumPage } from './scrapers/pages/album'
export type { PhotoPage } from './scrapers/pages/photo'
export type { VideoPage } from './scrapers/pages/video'
export type { PornstarPage } from './scrapers/pages/pornstar'
export type { ModelPage } from './scrapers/pages/model'

export type { AlbumSearchResult } from './scrapers/search/album'
export type { PornstarSearchResult } from './scrapers/search/pornstar'
export type { GifSearchResult } from './scrapers/search/gif'
export type { VideoSearchResult, VideoListResult } from './scrapers/search/video'

export type { PornstarListResult } from './scrapers/list/pornstars'

export type { WebmasterCategory } from './apis/webmaster/categories'
export type { WebmasterDeleted } from './apis/webmaster/deleted'
export type { WebmasterEmbed } from './apis/webmaster/embed'
export type { WebmasterSearch } from './apis/webmaster/search'
export type { WebmasterStarsDetailed } from './apis/webmaster/stars_detailed'
export type { WebmasterStars, WebmasterStar } from './apis/webmaster/stars'
export type { WebmasterTags } from './apis/webmaster/tags'
export type { WebmasterVideoById } from './apis/webmaster/video_by_id'
export type { WebmasterVideoIsActive } from './apis/webmaster/video_is_active'

export class PornHub {
    engine = new Engine()
    route = Route
    webMaster = new WebMaster(this.engine)

    setAgent(agent: RequestInit['agent']) {
        this.engine.request.setAgent(agent)
    }

    setHeader(key: string, value: string) {
        this.engine.request.setHeader(key, value)
    }

    setCookie(key: string, value: any) {
        this.engine.request.setCookie(key, value)
    }

    /**
     * See: https://github.com/pionxzh/Pornhub.js/issues/27
     * @deprecated This method is no longer needed.
     */
    async warmup() {
        console.warn('`warmup` has been deprecated. You can safely remove this method call. It has been handled internally.')
        // no-op
    }

    /**
     * Login with account and password.
    */
    login(account: string, password: string) {
        return login(this.engine, account, password)
    }

    /**
     * Logout from Pornhub.com.
    */
    logout() {
        return logout(this.engine)
    }

    /**
     * Get token from Pornhub.com.
     * Most of pornhub's api need this token.
     * You can cache this token to avoid frequent requests (I'm not sure about the expiration time!).
     *
     * For now, this token is only used for `autoComplete` and `searchModel`.
     * This library will automatically get token if you don't provide it.
     */
    getToken() {
        return getToken(this.engine)
    }

    /**
     * Get video information by url/ID
     * @param urlOrId Video ID or page url
    */
    async video(urlOrId: string) {
        if (!this.engine.warmedUp) {
            // make a call to the main page to get the cookies.
            // PornHub will redirect you to a corn video if you don't have a proper cookie set.
            // See issue: [#27 Video been redirected to a corn video](https://github.com/pionxzh/Pornhub.js/issues/27)\
            await getMainPage(this.engine)
            this.engine.warmedUp = true
        }
        return videoPage(this.engine, urlOrId)
    }

    /**
     * Get album information by url/ID
     * @param urlOrId Album ID or page url
    */
    album(urlOrId: string) {
        return albumPage(this.engine, urlOrId)
    }

    /**
     * Get photo information by url/ID
     * @param urlOrId Photo ID or page url
    */
    photo(urlOrId: string) {
        return photoPage(this.engine, urlOrId)
    }

    /**
     * Get pornstar information by url/ID
     * @param urlOrName Pornstar name or page url
    */
    pornstar(urlOrName: string) {
        return pornstarPage(this.engine, urlOrName)
    }

    /**
     * Get model information by url/ID
     * @param urlOrName Model name or page url
     */
    model(urlOrName: string) {
        return modelPage(this.engine, urlOrName)
    }

    /**
     * Get a random video.
     * @returns The same object as `video()`
     */
    randomVideo() {
        return randomPage(this.engine)
    }

    /**
     * Get autocomplete result by keyword.
     */
    autoComplete(keyword: string, options: AutoCompleteOptions = {}) {
        return getAutoComplete(this.engine, keyword, options)
    }

    /**
     * Search album by keyword.
     */
    searchAlbum(keyword: string, options: AlbumSearchOptions = {}) {
        return albumSearch(this.engine, keyword, options)
    }

    /**
     * Search gif by keyword.
     */
    searchGif(keyword: string, options: GifSearchOptions = {}) {
        return gifSearch(this.engine, keyword, options)
    }

    /**
     * Search pornstar by keyword.
     */
    searchPornstar(keyword: string, options: PornstarSearchOptions = {}) {
        return pornstarSearch(this.engine, keyword, options)
    }

    /**
     * Search model by keyword.
     */
    searchModel(keyword: string, options: AutoCompleteOptions = {}) {
        return modelSearch(this.engine, keyword, options)
    }

    /**
     * Search video by keyword.
     */
    searchVideo(keyword: string, options: VideoSearchOptions = {}) {
        return videoSearch(this.engine, keyword, options)
    }

    /**
     * Get video list.
     */
    videoList(options: VideoListOptions = {}) {
        return videoList(this.engine, options)
    }

    /**
     * Get pornstar list.
     */
    pornstarList(options: PornstarListOptions = {}) {
        return pornstarList(this.engine, options)
    }

    /**
     * Get recommended videos.
     */
    recommendedVideos(options: RecommendedOptions = {}) {
        return recommended(this.engine, options)
    }
}
