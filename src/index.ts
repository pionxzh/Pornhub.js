import type { RequestInit } from 'node-fetch'
import type { AlbumSearchOptions, GifSearchOptions, PornstarSearchOptions, VideoSearchOptions } from './types'
import { getMainPage, login, logout } from './apis'
import { Engine } from './core/engine'
import { WebMaster } from './core/webmaster'
import { albumPage } from './scrapers/pages/album'
import { photoPage } from './scrapers/pages/photo'
import { videoPage } from './scrapers/pages/video'
import { albumSearch } from './scrapers/search/album'
import { pornstarSearch } from './scrapers/search/pornstar'
import { gifSearch } from './scrapers/search/gif'
import { videoSearch } from './scrapers/search/video'

export class PornHub {
    engine = new Engine()
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
     * Search video by keyword.
     */
    searchVideo(keyword: string, options: VideoSearchOptions = {}) {
        return videoSearch(this.engine, keyword, options)
    }
}

