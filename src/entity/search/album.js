const BaseSearch = require('./base')
// const { removeProtectionBracket } = require('../utils/utils')

class AlbumSearch extends BaseSearch {
    constructor (engine, keyword, options) {
        super(engine)

        this.setQuery(keyword, options)
        this.setSegments(options.segments)
    }

    get url () {
        return this.engine.API.albums(this.segments).query(this.query)
    }

    setQuery (keyword, options = {}) {
        super.setQuery(keyword, options)
    }

    setSegments (val = 'female-straight-uncategorized') {
        if (typeof val === 'string') {
            this.segments = val
        } else if (Array.isArray(val)) {
            const compareFn = (a, b) => a.localeCompare(b)
            this.segments = val.sort(compareFn).join('-')
        } else {
            throw TypeError('Segments can only accept string or array.')
        }
    }

    parseResult ($) {
        const $list = $('ul#photosAlbumsSection li.photoAlbumListContainer div.photoAlbumListBlock')
        const result = $list.map(idx => {
            const item = $list.eq(idx)
            if (!item.length) return

            const title = item.attr('title')
            const url = `${this.engine.BASE_URL}${item.find('a').attr('href')}`
            const rating = item.find('.album-photo-percentage').text()
            const bgImgUrl = item.attr('style') || item.data('bkg')
            const preview = bgImgUrl.replace(`background-image: url('`, '').replace(`');`, '')
            // Don't remove the protection code, it will cause `Not authorized` error
            // preview = removeProtectionBracket(preview)
            return { title, url, rating, preview }
        }).get()

        return result
    }

    parse (html) {
        const $ = this.loadHtml(html)
        this.data = this.parseResult($)
        this.paging = this.parsePaging($)
        this.counting = this.parseCounting($)

        return this
    }
}

module.exports = AlbumSearch
