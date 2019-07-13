class PornstarApi {
    constructor (engine) {
        this.engine = engine
    }

    parse (apiData) {
        return apiData.stars.map(item => item.star.star_name)
    }

    run () {
        return this.engine.API.webmasters.stars.get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = PornstarApi
