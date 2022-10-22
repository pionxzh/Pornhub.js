import type { RequestInit } from 'node-fetch'
import type { AlbumSearchOptions, AutoCompleteOptions, GifSearchOptions, PornstarSearchOptions, VideoSearchOptions } from './types'
import { Route, getMainPage, login, logout } from './apis'
import { Engine } from './core/engine'
import { WebMaster } from './core/webmaster'
import { albumPage } from './scrapers/pages/album'
import { photoPage } from './scrapers/pages/photo'
import { videoPage } from './scrapers/pages/video'
import { albumSearch } from './scrapers/search/album'
import { pornstarSearch } from './scrapers/search/pornstar'
import { gifSearch } from './scrapers/search/gif'
import { videoSearch } from './scrapers/search/video'
import { modelSearch } from './scrapers/search/model'
import { getAutoComplete } from './apis/autoComplete'
import { getToken } from './apis/getToken'
import { modelPage } from './scrapers/pages/model'
import { pornstarPage } from './scrapers/pages/pornstar'

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
     * I don't know why this works, but it does.
     * See: https://github.com/pionxzh/Pornhub.js/issues/27
     */
    warmup() {
        return getMainPage(this.engine)
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
    video(urlOrId: string) {
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
}

