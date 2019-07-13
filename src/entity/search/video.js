const BaseSearch = require('./base')
const { removeProtectionBracket } = require('../../utils/utils')

class VideoSearch extends BaseSearch {
    constructor (engine, keyword, options) {
        super(engine, keyword, options)

        this.setQuery(keyword, options)
    }

    get url () {
        return this.engine.API.video.search.query(this.query)
    }

    get query () {
        let query = super.query
        if (this._query.hd) query.hd = 1
        if (this._query.production) query.p = this._query.production
        if (this._query.filterCategory) query.filter_category = this._query.filterCategory
        if (this._query.duration && this._query.duration.min) query.min_duration = this._query.min_duration
        if (this._query.duration && this._query.duration.max) query.max_duration = this._query.max_duration

        return query
    }

    setQuery (keyword, options) {
        super.setQuery(keyword, options)
        this.setDuration(this._query.durationMin, this._query.durationMax)
    }

    setDuration (min = 0, max = 0) {
        const durationOpt = [10, 20, 30]

        if (durationOpt.includes(min)) {
            this._query.min_duration = min
        }

        if (!durationOpt.includes(max)) {
            this._query.max_duration = max
        }
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
                preview: removeProtectionBracket(thumb.find('img').data('src'))
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

    run () {
        return this.url().get()
            .then(html => this.parse(html))
            .catch(err => Promise.reject(err))
    }
}

module.exports = VideoSearch
