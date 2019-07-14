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

        this.data.title = $('div#main-container').data('video-title').replace(' - Pornhub.com', '')
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

        const $link = $('a.bolded[rel=nofollow]')
        this.data.provider = $link.length ? { username: $link.text(), url: $link.attr('href') } : null
    }

    parseByHtml (html) {
        // parse duration
        const durationResult = /"video_duration":"(.*?)"/.exec(html)
        const durationTotalSec = parseInt(durationResult[1])
        this.data.duration = `${~~(durationTotalSec / 60)}:${durationTotalSec % 60}`

        // parse video
        this.data.videos = this.parseVideo(html)

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

    parseVideo (html) {
        try {
            const mediaDefResult = /"mediaDefinitions":(\[.*?\])/.exec(html)
            const mediaDefinitions = JSON.parse(mediaDefResult[1])

            const parseFileName = str => /\/([a-zA-Z0-9%=&_-]+\.(mp4|flv))/.exec(str)
            const videos = mediaDefinitions
                .filter(item => item.videoUrl !== '')
                .map(item => {
                    const filename = parseFileName(item.videoUrl)
                    return {
                        quality: item.quality,
                        filename: filename[1],
                        extension: filename[2],
                        url: item.videoUrl
                    }
                })
                .sort((a, b) => b.quality - a.quality)

            return videos
        } catch (err) {
            console.error(err)
            return []
        }
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
