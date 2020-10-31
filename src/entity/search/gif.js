const BaseSearch = require('./base')
const { removeProtectionBracket } = require('../../utils/utils')

class GifSearch extends BaseSearch {
    constructor (engine, keyword, options) {
        super(engine)

        this.setQuery(keyword, options)
        this.setSexualOrientation(options.sexualOrientation)
    }

    get url () {
        return this.engine.API.gifs.search.query(this.query)
    }

    setQuery (keyword, options = {}) {
        super.setQuery(keyword, options)
    }

    setSexualOrientation (val = 'straight') {
        val = val.toLowerCase()
        if (val === 'straight') this.sexualOrientation = ''
        if (val === 'gay') this.sexualOrientation = 'gay'
        if (val === 'transgender') this.sexualOrientation = 'transgender'
    }

    parseResult ($) {
        const list = $('ul.gifLink li.gifVideoBlock ')
        const result = list.map(idx => {
            const item = list.eq(idx)
            if (!item.length) return

            const video = item.find('video')
            return {
                title: item.find('.title').text(),
                url: `${this.engine.BASE_URL}${item.find('a').attr('href')}` || '',
                mp4: video.data('mp4') || '',
                webm: video.data('webm') || '',
                preview: removeProtectionBracket(video.attr('poster')) || ''
            }
        }).get()

        return result
    }

    parse (html) {
        const $ = this.loadHtml(html)
        this.data = this.parseResult($)
        this.paging = this.parsePaging($)
        this.counting = this.parseCounting($)

        return this
    }
}

module.exports = GifSearch
