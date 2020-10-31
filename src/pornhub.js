const Engine = require('./core/engine')
const WebMaster = require('./webmaster')

const VideoSearch = require('./entity/search/video')
const AlbumSearch = require('./entity/search/album')
const GifSearch = require('./entity/search/gif')
const PornstarSearch = require('./entity/search/pornstar')

class PornHub {
    constructor () {
        this.engine = new Engine()
        this.engine.start()

        this.webMaster = new WebMaster(this.engine)
    }

    /**
     * Listen on specific event.
     * @param {('REQUEST'|'DEBUG'|'loggedIn'|'logout')} event
     * @param {Function} fn
     * @returns {Promise.<Object>}
    */
    on (event, fn) {
        this.engine.on(event, fn)
    }

    setAgent (data) {
        this.engine.request.setAgent(data)
    }

    setHeader (data) {
        this.engine.request.setHeader(data)
    }

    /**
     * Login with your account and password.
     * @param {string} account
     * @param {string} password
     * @returns {Promise.<Object>}
    */
    login (account, password) {
        return this.engine.action.login(account, password)
    }

    /**
     * Logout from Pornhub.com.
     * @returns {Promise.<Object>}
    */
    logout () {
        return this.engine.action.logout()
    }

    /**
     * Get video information by url/ID.
     * @param {string} url The video url or ID.
     * @returns {Promise.<Object>}
    */
    get (url) {
        const VideoInfo = require('./entity/info/video')
        return new VideoInfo(this.engine, url).run()
    }

    /**
     * Get video information by url/ID.
     * @param {string} url The video url or ID.
     * @returns {Promise.<Object>}
    */
    video (url) {
        const VideoInfo = require('./entity/info/video')
        return new VideoInfo(this.engine, url).run()
    }

    /**
     * Get album information by url/ID.
     * @param {string} url The album url or ID.
     * @returns {Promise.<Object>}
    */
    album (url) {
        const AlbumInfo = require('./entity/info/album')
        return new AlbumInfo(this.engine, url).run()
    }

    /**
     * Get photo information by url/ID.
     * @param {string} url The photo url or ID.
     * @returns {Promise.<Object>}
    */
    photo (url) {
        const PhotoInfo = require('./entity/info/photo')
        return new PhotoInfo(this.engine, url).run()
    }

    /**
     * Search video by keyword.
     * @url https://www.pornhub.com/webmaster/search?search=keyword
     * @param {('Video'|'Album'|'Gif'|'Pornstar')} type Search type
     * @param {string} keyword
     * @param {Object} options
     * @param {number} [options.page=1]
     * @param {boolean} [options.hd] show hd video
     * @param {boolean} [options.verified] show verified video
     * @param {('gay'|'transgender')} [options.sexualOrientation]
     * @param {'production'|'homemade'} [options.production]
     * @param {number} [options.durationMin] Options: 10|20|30
     * @param {number} [options.durationMax] Options: 10|20|30
     * @param {('Most Relevant'|'Most Recent'|'Most Viewed'|'Top Rated'|'Longest'|'No. of Video')} [options.order]
     * @param {Array<('male'|'female'|'straight'|'gay'|'transgender'|'uncategorized'|'misc')>} [options.segments]
     * @returns {Promise.<Object[]>}
    */
    search (type, keyword, options = {}) {
        switch (type.toLowerCase()) {
            case 'video':
                return new VideoSearch(this.engine, keyword, options).run()
            case 'gif':
                return new GifSearch(this.engine, keyword, options).run()
            case 'album':
                return new AlbumSearch(this.engine, keyword, options).run()
            case 'pornstar':
                return new PornstarSearch(this.engine, keyword, options).run()
            default:
                console.error(`Search type ${type} is not supported.`)
        }
    }
}

module.exports = PornHub
