const { regexByRules, unescape } = require('../../utils/utils')
const BaseInfo = require('./base')
const UrlParser = require('../../utils/url')

class VideoInfo extends BaseInfo {
    constructor (engine, url) {
        super(engine)

        this.setQuery(url)
    }

    setQuery (url) {
        this.id = UrlParser.getVideoID(url)
        this.query = { viewkey: this.id }
    }

    get url () {
        return this.engine.API['view_video.php'].query(this.query)
    }

    parseByDom ($) {
        const voteUp = parseInt($('span.votesUp').text()) || 0
        const voteDown = parseInt($('span.votesDown').text()) || 0

        this.data.title = $('head > title').text().replace(' - Pornhub.com', '')
        this.data.views = parseInt($('span.count').text().replace(/,/g, '')) || null
        this.data.vote = {
            up: voteUp,
            down: voteDown,
            total: voteUp + voteDown,
            // rating: $('span.percent').text() || null
            rating: Math.round(voteUp / (voteUp + voteDown) * 100) / 100
        }
        this.data.premium = $('#userPremium').length !== 0
        this.data.thumb = $('.thumbnail img').attr('src')

        // parse video
        this.data.videos = this.parseVideo($)

        const $link = $('a.bolded[rel=nofollow]')
        this.data.provider = $link.length ? { username: $link.text(), url: $link.attr('href') } : null
    }

    parseByHtml (html) {
        // parse duration
        const durationResult = /"video_duration":"(.*?)"/.exec(html)
        const durationTotalSec = parseInt(durationResult[1])
        this.data.duration = `${~~(durationTotalSec / 60)}:${durationTotalSec % 60}`

        // parse meta data
        const tagRule = /&channel\[context_tag\]=(.*?)&/g
        const categoryRule = /&channel\[context_category\]=(.*?)&/g
        const pornStarRule = /&channel\[context_pornstar\]=(.*?)&/g

        const resultTag = regexByRules(tagRule, html, 2)
        const resultCate = regexByRules(categoryRule, html, 2)
        const resultPstar = regexByRules(pornStarRule, html, 2)

        const isEmpty = (val) => val === null || val[1] === ''
        const splitData = (val) => val[1].toLowerCase().split(',')

        this.data.tags = isEmpty(resultTag) ? [] : splitData(resultTag)
        this.data.pornstars = isEmpty(resultPstar) ? [] : splitData(resultPstar)
        this.data.categories = isEmpty(resultCate) ? [] : splitData(resultCate)
    }

    parseVideo ($) {
        const parseFileName = str => /\/([a-zA-Z0-9%=&_-]+\.(mp4|flv))/.exec(str)

        const $videos = $('.downloadBtn')
        const videos = $videos.map(idx => {
            const item = $videos.eq(idx)
            if (!item.length) return

            const url = item.attr('href')
            const [, filename, extension] = parseFileName(url)
            const quality = filename.split('_')[0]
            return {
                url,
                quality,
                filename,
                extension
            }
        }).get().sort((a, b) => b.quality - a.quality)
        return videos
    }

    parse (html) {
        html = unescape(html)
        const $ = this.loadHtml(html)
        this.parseByDom($)
        this.parseByHtml(html)

        return this
    }
}

module.exports = VideoInfo
