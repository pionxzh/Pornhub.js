const BaseSearch = require('./base')
const { removeProtectionBracket } = require('../../utils/utils')

class PornstarSearch extends BaseSearch {
    constructor (engine, keyword, options) {
        super(engine)

        this.setQuery(keyword, options)
    }

    get url () {
        return this.engine.API.pornstars.search.query(this.query)
    }

    setQuery (keyword, options = {}) {
        super.setQuery(keyword, options)
    }

    parseResult ($) {
        const $list = $('ul#pornstarsSearchResult li div.wrap')
        const result = $list.map(idx => {
            const item = $list.eq(idx)
            if (!item.length) return

            return {
                name: item.find('.title').text(),
                url: `${this.engine.BASE_URL}${item.find('a').attr('href')}` || '',
                views: item.find('.pstarViews').text().replace('views', '').trim() || 0,
                videoNum: parseInt(item.find('.videosNumber').text()) || 0,
                rank: parseInt(item.find('.rank_number').text()) || 0,
                photo: removeProtectionBracket(item.find('img').data('thumb_url')) || ''
            }
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

module.exports = PornstarSearch
