class DeletedApi {
    constructor (engine, page) {
        this.engine = engine
        this.setPage(page)
    }

    setPage (page = 1) {
        this.page = page
    }

    parse (apiData) {
        return apiData.videos
    }

    run () {
        const page = this.page
        return this.engine.API.webmasters.deleted_videos.query({ page }).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = DeletedApi
