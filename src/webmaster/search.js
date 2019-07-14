const VideoApi = require('./video')

class SearchApi {
    constructor (engine, keyword, options) {
        this.engine = engine
        this.setQuery(keyword, options)
    }

    setQuery (keyword, options = {}) {
        let query = {}
        query.search = keyword.split(' ').join('+')
        if (options.page) query['page'] = options.page
        if (options.period) query['period'] = options.period
        if (options.ordering) query['ordering'] = options.ordering
        if (options.thumbsize) query['thumbsize'] = options.thumbsize
        if (options.tags) query['tags[]'] = options.tags.join(',')
        if (options.stars) query['stars[]'] = options.stars.join(',')
        if (options.category) query['category'] = options.tags.join(',')

        this.query = query
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
