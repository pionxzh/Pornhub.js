const UrlParser = require('../utils/url')

class EmbedApi {
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

        return apiData.embed.code
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
    }

    run () {
        return this.engine.API.webmasters.video_embed_code.query(this.query).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = EmbedApi
