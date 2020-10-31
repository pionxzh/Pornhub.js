const BaseInfo = require('./base')
const UrlParser = require('../../utils/url')
// const { removeProtectionBracket } = require('../utils/utils')

class AlbumInfo extends BaseInfo {
    constructor (engine, url) {
        super(engine)

        this.id = UrlParser.getAlbumID(url)
    }

    get url () {
        return this.engine.API.album(this.id)
    }

    parsePhotos ($) {
        const $list = $('ul.photosAlbumsListing li.photoAlbumListContainer div.photoAlbumListBlock')
        const photos = $list.map(idx => {
            const item = $list.eq(idx)
            if (!item.length) return

            const url = `${this.engine.BASE_URL}${item.find('a').attr('href')}`
            const views = item.find('.album-views').text().replace('Views: ', '').trim()
            const rating = item.find('.album-rating').text()
            const preview = item.data('bkg')

            // Don't remove the protection code, it will cause `Not authorized` error
            // preview = removeProtectionBracket(preview)
            return { url, views, rating, preview }
        }).get()

        return photos
    }

    parseProvider ($) {
        const $user = $('div.pfileInfoBox div.usernameWrap')

        const username = $user.find('a').text()
        const url = $user.find('a').attr('href')
        const id = $user.data('userid')

        return { username, url, id }
    }

    parseTag ($) {
        const $list = $('div.tagContainer span.tagLabel')
        return $list.map(idx => $list.eq(idx).text()).get()
    }

    parse (html) {
        const $ = this.loadHtml(html)
        this.data.photos = this.parsePhotos($)
        this.data.tags = this.parseTag($)
        this.data.provider = this.parseProvider($)

        return this
    }
}

module.exports = AlbumInfo
