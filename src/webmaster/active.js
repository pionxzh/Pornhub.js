const UrlParser = require('../utils/url')

class ActiveApi {
    constructor (engine, url) {
        this.engine = engine
        this.setQuery(url)
    }

    setQuery (url) {
        this.id = UrlParser.getVideoID(url)
        this.query = { id: this.id }
    }

    parse (apiData) {
        if (apiData.code && apiData.code === '2002') {
            throw new Error('No video with this ID')
        }

        const isActive = apiData.active.is_active === '1'
        return isActive
    }

    run () {
        return this.engine.API.webmasters.is_video_active.query(this.query).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = ActiveApi
