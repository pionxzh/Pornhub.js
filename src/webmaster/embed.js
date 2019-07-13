class EmbedApi {
    constructor (engine, url) {
        this.engine = engine
        this.handleID(url)
    }

    handleID (url) {
        const UrlRule = /www\.pornhub\.com\/view_video\.php\?viewkey=([a-zA-z0-9]{1,30})/
        this.id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url
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
        const id = this.id
        return this.engine.API.webmasters.video_embed_code.query({ id }).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = EmbedApi
