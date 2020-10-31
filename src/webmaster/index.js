class WebMaster {
    constructor (engine) {
        this.engine = engine
    }

    /**
     * Search video by keyword.
     * @url https://www.pornhub.com/webmaster/search?search=keyword
     * @param {string} keyword
     * @param {Object} options
     * @param {number} [options.page=1]
     * @param {string} [options.category] Category ID
     * @param {string[]} [options.tags] List of tag
     * @param {string[]} [options.stars] List of pornstar name
     * @param {('weekly'|'monthly'|'alltime')} [options.period]
     * @param {string} [options.phrase]
     * @param {('newest'|'mostviewed'|'rating')} [options.ordering]
     * @param {('small'|'small_hd'|'medium'|'medium_hd'|'large'|'large_hd')} [options.thumbsize] Thumbnail photo size.
     * @returns {Promise.<Object[]>}
     * @example
     * pornhub.search('keyword', { page: 2 })
     *   .then(list => console.log(`The first videos is ${list[0].title}`))
    */
    search (keyword, options) {
        const SearchApi = require('./search')
        return new SearchApi(this.engine, keyword, options).run()
    }

    /**
     * Get video information by url/id.
     * @url https://www.pornhub.com/webmaster/video_by_id?id=ID&thumbsize=large
     * @param {string} url Video ID or page url.
     * @param {('small'|'small_hd'|'medium'|'medium_hd'|'large'|'large_hd')} [options.thumbsize] Thumbnail photo size.
     * @returns {Promise.<Object>}
     * @example
     * pornhub.getVideo('ph5a9634c9a827e')
     *   .then(res => console.log(`Title: ${res.title}`))
    */
    getVideo (url, thumbsize) {
        const VideoApi = require('./video')
        return new VideoApi(this.engine, url, thumbsize).run()
    }

    /**
     * Show is video active by url/id (deleted video would be false).
     * @url https://www.pornhub.com/webmasters/is_video_active?id=ID
     * @param {string} url Video ID or page url.
     * @returns {Promise.<boolean>}
     * @example
     * pornhub.isVideoActive('ph5a9634c9a827e')
     *   .then(isActive => console.log(`Video is ${isActive ? 'active':'inactive'}`))
    */
    isVideoActive (url) {
        const ActiveApi = require('./active')
        return new ActiveApi(this.engine, url).run()
    }

    /**
     * Get embed HTML code by video url/id.
     * @url https://www.pornhub.com/webmasters/video_embed_code?id=ID
     * @param {string} url Video ID or page url.
     * @returns {Promise.<string>} HTML code of embed video
    */
    getVideoEmbedCode (url) {
        const EmbedApi = require('./embed')
        return new EmbedApi(this.engine, url).run()
    }

    /**
     * Get deleted video list by page.
     * @url https://www.pornhub.com/webmasters/deleted_videos?page=1
     * @param {number} [page=1] Default: 1
     * @returns {Promise.<Object[]>}
    */
    getDeletedVideos (page) {
        const DeletedApi = require('./deleted')
        return new DeletedApi(this.engine, page).run()
    }

    /**
     * Get tag list by first letter of tag name.
     * @url https://www.pornhub.com/webmasters/tags?list=a
     * @param {string} [letter=a] First letter of tag name. Default: 'a'. Range: a-z.
     * @returns {Promise.<string[]>} Tag list
    */
    getTags (letter) {
        const TagApi = require('./tag')
        return new TagApi(this.engine, letter).run()
    }

    /**
     * Get category list.
     * @url https://www.pornhub.com/webmasters/categories
     * @returns {Promise.<Object[]>}
    */
    getCategories () {
        const CategoryApi = require('./category')
        return new CategoryApi(this.engine).run()
    }

    /**
     * Get pornstar name list.
     * @url https://www.pornhub.com/webmasters/stars
     * @returns {Promise.<string[]>}
    */
    getPornstars () {
        const PornstarApi = require('./pornstar')
        return new PornstarApi(this.engine).run()
    }

    /**
     * Get pornstar detail list.
     * @url https://www.pornhub.com/webmasters/stars_detailed
     * @returns {Promise.<Object[]>}
    */
    getPornstarsDetail () {
        const PornstarDetailApi = require('./pornstar_detail')
        return new PornstarDetailApi(this.engine).run()
    }
}
module.exports = WebMaster
