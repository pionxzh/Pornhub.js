const cheerio = require('cheerio')

class BaseInfo {
    constructor (engine) {
        this.engine = engine
        this.data = {}
    }

    loadHtml (html) {
        return cheerio.load(html)
    }

    run () {
        return this.url.get()
            .then(html => this.parse(html))
            .catch(err => Promise.reject(err))
    }
}

module.exports = BaseInfo
