const VideoApi = require('./video')

class SearchApi {
    constructor (engine, keyword, options) {
        this.engine = engine
        this.setQuery(keyword, options)
    }

    get query () {
        let query = {}
        query.search = this._query.keyword.split(' ').join('+')
        if (this._query.page) query.page = this._query.page
        if (this._query.period) query.period = this._query.period
        if (this._query.ordering) query.ordering = this._query.ordering
        if (this._query.thumbsize) query.thumbsize = this._query.thumbsize
        if (this._query.tags) query['tags[]'] = this._query.tags.join(',')
        if (this._query.category) query.category = this._query.tags.join(',')
        if (this._query.stars) query['stars[]'] = this._query.stars.join(',')

        return query
    }

    setQuery (keyword, options = {}) {
        this._query = { keyword, ...options }
    }

    parse (apiData) {
        const videoApi = new VideoApi()
        const parseData = (data) => videoApi.transformData(data)
        return apiData.videos.map(item => parseData(item))
    }

    run () {
        return this.engine.API.webmasters.search.query(this.query).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = SearchApi
