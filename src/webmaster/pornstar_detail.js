class PornstarDetailApi {
    constructor (engine) {
        this.engine = engine
    }

    parse (apiData) {
        return apiData.stars.map(item => item.star)
    }

    run () {
        return this.engine.API.webmasters.stars_detailed.get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = PornstarDetailApi
