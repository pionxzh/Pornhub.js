class DeletedApi {
    constructor (engine, page) {
        this.engine = engine
        this.setQuery(page)
    }

    setQuery (page = 1) {
        this.query = { page: page }
    }

    parse (apiData) {
        return apiData.videos
    }

    run () {
        return this.engine.API.webmasters.deleted_videos.query(this.query).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = DeletedApi
