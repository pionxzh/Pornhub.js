class TagApi {
    constructor (engine, letter) {
        this.engine = engine
        this.setQuery(letter)
    }

    setQuery (letter = 'a') {
        this.query = { list: letter.toLowerCase() }
    }

    parse (apiData) {
        return apiData.tags
    }

    run () {
        return this.engine.API.webmasters.tags.query(this.query).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = TagApi
