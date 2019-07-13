class Categories {
    constructor (engine) {
        this.engine = engine
    }

    parse (data) {
        return data.categories.sort((a, b) => a.id - b.id)
    }

    run () {
        return this.engine.API.webmasters.categories.get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = Categories
