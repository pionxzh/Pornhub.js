const cheerio = require('cheerio')

class BaseSearch {
    constructor (engine) {
        this.engine = engine
    }

    setQuery (keyword, options = {}) {
        let query = {}
        query.search = keyword.split(' ').join('+')
        if (options.order) query.o = this.handleOrder(options.order)
        if (options.page) query.page = options.page

        this.query = query
    }

    handleOrder (name) {
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
        return needMapping ? orderMapping[key] : key
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
