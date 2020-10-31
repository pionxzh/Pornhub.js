const BaseSearch = require('./base')

class VideoSearch extends BaseSearch {
    constructor (engine, keyword, options) {
        super(engine)

        this.setQuery(keyword, options)
    }

    get url () {
        return this.engine.API.video.search.query(this.query)
    }

    setQuery (keyword, options = {}) {
        super.setQuery(keyword, options)
        if (options.hd) this.query.hd = 1
        if (options.production) this.query.p = options.production
        if (options.filterCategory) this.query.filter_category = options.filterCategory
        if (this.checkDuration(options.durationMin)) this.query.min_duration = options.durationMin
        if (this.checkDuration(options.durationMax)) this.query.max_duration = options.durationMax
    }

    checkDuration (val = 0) {
        const durationOpt = [10, 20, 30]
        return durationOpt.includes(val)
    }

    parseResult ($) {
        const list = $('#videoSearchResult li.videoBox')

        const result = list.map(idx => {
            const item = list.eq(idx)
            if (!item.length) return

            const thumb = item.find('.linkVideoThumb').eq(0)

            return {
                title: thumb.attr('title'),
                url: `${this.engine.BASE_URL}${thumb.attr('href')}`,
                duration: item.find('.duration').text(),
                hd: !!item.find('.hd-thumbnail').length,
                premium: !!item.find('.premiumIcon').length,
                preview: thumb.find('img').data('src')
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

module.exports = VideoSearch
