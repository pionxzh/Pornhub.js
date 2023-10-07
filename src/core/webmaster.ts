import { categories, deleted, search, stars, stars_detailed, tags, video_by_id, video_embed_code, video_is_active } from '../apis/webmaster'
import type { Engine } from './engine'
import type { LowerLetter, ThumbSize, WebmasterSearchOptions } from '../types'

export class WebMaster {
    constructor(private engine: Engine) {
    }

    /**
     * Search video by keyword
     * @url https://www.pornhub.com/webmasters/search?search=keyword
     * @example
     * const results = await pornhub.webMaster.search('keyword', { page: 2, period: 'weekly' })
     */
    search(keyword: string, options: WebmasterSearchOptions = {}) {
        return search(this.engine, keyword, options)
    }

    /**
     * Get video information by url/id
     * @url https://www.pornhub.com/webmasters/video_by_id?id={ID}&thumbsize=large
     * @param urlOrId Video ID or page url
     * @param thumbsize Thumbnail photo size
     * @example
     * const video = await pornhub.webMaster.getVideo('ph5a9634c9a827e')
     */
    getVideo(urlOrId: string, thumbsize?: ThumbSize) {
        return video_by_id(this.engine, urlOrId, thumbsize)
    }

    /**
     * Get video active status by url/id (deleted video will be false)
     * @url https://www.pornhub.com/webmasters/is_video_active?id={ID}
     * @param urlOrId Video ID or page url
     * @example
     * const isActive = await pornhub.webMaster.isVideoActive('ph5a9634c9a827e')
     */
    isVideoActive(urlOrId: string) {
        return video_is_active(this.engine, urlOrId)
    }

    /**
     * Get embed HTML code by video url/id
     * @url https://www.pornhub.com/webmasters/video_embed_code?id=ID
     * @param urlOrId Video ID or page url
     * @example
     * const code = await pornhub.webMaster.getVideoEmbedCode('ph5a9634c9a827e')
     * // <iframe src="https://www.pornhub.com/embed/xxxxxx" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe>
     */
    getVideoEmbedCode(urlOrId: string) {
        return video_embed_code(this.engine, urlOrId)
    }

    /**
     * Get deleted video list by page
     * @url https://www.pornhub.com/webmasters/deleted_videos?page=1
     * @param page Page number, default: 1
     * @example
     * const deletedVideos = await pornhub.webMaster.getDeletedVideos(2)
     */
    getDeletedVideos(page = 1) {
        return deleted(this.engine, page)
    }

    /**
     * Query tag list by the first letter of tag name
     * @url https://www.pornhub.com/webmasters/tags?list=a
     * @param letter First letter of tag name. Default: 'a'. Range: a-z.
     * @example
     * const tags = await pornhub.webMaster.getTags('s')
     * // ['solo', 'squirting', 'stockings', ...]
     */
    getTags(letter: LowerLetter = 'a') {
        return tags(this.engine, letter)
    }

    /**
     * Get category list
     * @url https://www.pornhub.com/webmasters/categories
     * @example
     * const categories = await pornhub.webMaster.getCategories()
     * // [{ id: "65", category: "threesome" }, { id: "105", category: "60fps" }]
     */
    getCategories() {
        return categories(this.engine)
    }

    /**
     * Get pornstar name list
     * @url https://www.pornhub.com/webmasters/stars
     * @example
     * const pornstars = await pornhub.webMaster.getPornstars()
     */
    getPornstars() {
        return stars(this.engine)
    }

    /**
     * Get pornstar detail list
     * @url https://www.pornhub.com/webmasters/stars_detailed
     * const pornstars = await pornhub.webMaster.getPornstarsDetail()
     */
    getPornstarsDetail() {
        return stars_detailed(this.engine)
    }
}
