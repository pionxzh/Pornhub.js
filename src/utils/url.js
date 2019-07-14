class UrlParser {
    static getVideoID (url) {
        const UrlRule = /www\.pornhub\.com\/view_video\.php\?viewkey=([a-zA-z0-9]{1,30})/
        const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url
        return id
    }

    static getAlbumID (url) {
        const UrlRule = /www\.pornhub\.com\/album\/([0-9]{1,30})/
        const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url
        return id
    }

    static getPhotoID (url) {
        const UrlRule = /www\.pornhub\.com\/photo\/([0-9]{1,30})/
        const id = UrlRule.test(url) ? UrlRule.exec(url)[1] : url
        return id
    }
}

module.exports = UrlParser
