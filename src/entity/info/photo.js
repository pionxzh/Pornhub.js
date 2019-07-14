const BaseInfo = require('./base')
const UrlParser = require('../../utils/url')

class PhotoInfo extends BaseInfo {
    constructor (engine, url) {
        super(engine)

        this.id = UrlParser.getPhotoID(url)
    }

    get url () {
        return this.engine.API.photo(this.id)
    }

    parsePhoto ($) {
        const photoWrapper = $('div#photoWrapper')
        const $img = photoWrapper.find('img')
        const title = $img.attr('alt') || ''
        const url = $img.attr('src') || ''
        const albumID = photoWrapper.data('album-id').toString() || ''
        const rating = photoWrapper.find('span#votePercentageNumber').text() + '%' || ''

        const removeComma = str => str.replace(',', '')
        const viewsText = photoWrapper.find('section#photoInfoSection strong').text()
        const views = parseInt(removeComma(viewsText)) || ''

        return {
            title,
            views,
            rating,
            albumID,
            url
        }
    }

    parseProvider ($) {
        const $user = $('div#userInformation div.usernameWrap')

        const username = $user.find('a').text()
        const url = $user.find('a').attr('href')
        const id = $user.data('userid')

        return { username, url, id }
    }

    parseTag ($) {
        const $list = $('ul.tagList a.tagText')
        return $list.map(idx => $list.eq(idx).text()).get()
    }

    parse (html) {
        const $ = this.loadHtml(html)
        this.data.info = this.parsePhoto($)
        this.data.tags = this.parseTag($)
        this.data.provider = this.parseProvider($)

        return this
    }
}

module.exports = PhotoInfo
