const cheerio = require('cheerio')

class BaseSearch {
    constructor (engine, keyword, options) {
        this.engine = engine
    }

    get query () {
        let query = {}
        query.search = this._query.keyword.split(' ').join('+')
        if (this._query.order) query.o = this._query.order
        if (this._query.page) query.page = this._query.page

        return query
    }

    setQuery (keyword, options = {}) {
        this._query = { keyword, ...options }
        if (this._query.order) this.setOrder(this._query.order)
    }

    setOrder (name) {
        const orderMapping = {
            // 'most relevant': '',
            'most recent': 'mr',
            'most viewed': 'mv',
            'most popular': 'mp',
            'top rated': 'tr',
            'longest': 'lg',
            'no. of video': 'nv'
        }

        const key = name.toLowerCase()
        const needMapping = Object.keys(orderMapping).includes(key)
        this._query.order = needMapping ? orderMapping[key] : key
    }

    loadHtml (html) {
        return cheerio.load(html)
    }

    run () {
        return this.url.get()
            .then(html => this.parse(html))
            .catch(err => Promise.reject(err))
    }

    parsePaging ($) {
        const currentPage = parseInt($('li.page_current').text())
        const nextPage = $('li.page_next')
        const maxPage = nextPage.length ? parseInt($('li.page_next').prev('li').text()) : currentPage
        return {
            current: currentPage,
            maxPage: maxPage,
            isEnd: !nextPage.length
        }
    }

    parseCounting ($) {
        try {
            const counterStr = $('.showingCounter').text()
            const [, from, to, total] = /(\d+)-(\d+)\sof\s(\d+)/.exec(counterStr)
            return {
                from: parseInt(from),
                to: parseInt(to),
                total: parseInt(total)
            }
        } catch (err) {
            return {
                from: 0,
                to: 0,
                total: 0
            }
        }
    }
}

module.exports = BaseSearch
