const UrlParser = require('../utils/url')

class VideoApi {
    constructor (engine, url, thumbsize) {
        this.engine = engine
        this.setQuery(url, thumbsize)
    }

    setQuery (url, thumbsize = 'large') {
        this.id = UrlParser.getVideoID(url)
        this.query = { id: this.id, thumbsize: thumbsize }
    }

    transformData (data) {
        // vote
        const total = data.ratings
        const rating = Math.round(parseFloat(data.rating) * 100) / 100
        const up = Math.round(total * rating / 100)
        const down = total - up
        const vote = { up, down, total, rating }

        const tags = data.tags.map(item => item['tag_name'].replace(' ', '-'))
        const pornstars = data.pornstars.map(item => item['pornstar_name'])
        const categories = data.categories.map(item => item['category'])
        const thumbList = data.thumbs.map(item => {
            delete item.size
            return item
        })
        return {
            url: data.url,
            title: data.title,
            views: data.views,
            duration: data.duration,
            thumb: data.default_thumb,
            thumbList,
            publishDate: data.publish_date,
            vote,
            tags,
            pornstars,
            categories
        }
    }

    parse (apiData) {
        if (apiData.code && apiData.code === '2002') {
            throw new Error('No video with this ID')
        }

        return this.transformData(apiData.video)
    }

    run () {
        return this.engine.API.webmasters.video_by_id.query(this.query).get()
            .then(data => this.parse(data))
            .catch(err => Promise.reject(err))
    }
}

module.exports = VideoApi
