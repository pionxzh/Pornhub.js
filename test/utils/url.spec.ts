import { describe, expect, it } from 'vitest'
import { UrlParser } from '../../src/utils/url'

describe('Parse Url ID', () => {
    it('# Video ID', () => {
        const id = 'ph5a9634c9a827e'
        const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5a9634c9a827e'

        expect(UrlParser.getVideoID(id)).to.equal(id)
        expect(UrlParser.getVideoID(url)).to.equal(id)
    })

    it('# Video ID from different domain', () => {
        const id = 'ph5a9634c9a827e'
        const url = 'https://cn.pornhub.com/view_video.php?viewkey=ph5a9634c9a827e'

        expect(UrlParser.getVideoID(id)).to.equal(id)
        expect(UrlParser.getVideoID(url)).to.equal(id)
    })

    it('# Album ID', () => {
        const id = '367633'
        const url = 'https://www.pornhub.com/album/367633'

        expect(UrlParser.getAlbumID(id)).to.equal(id)
        expect(UrlParser.getAlbumID(url)).to.equal(id)
    })

    it('# Album ID from different domain', () => {
        const id = '367633'
        const url = 'https://cn.pornhub.com/album/367633'

        expect(UrlParser.getAlbumID(id)).to.equal(id)
        expect(UrlParser.getAlbumID(url)).to.equal(id)
    })

    it('# Photo ID', () => {
        const id = '3683968'
        const url = 'https://www.pornhub.com/photo/3683968'

        expect(UrlParser.getPhotoID(id)).to.equal(id)
        expect(UrlParser.getPhotoID(url)).to.equal(id)
    })

    it('# Photo ID from different domain', () => {
        const id = '3683968'
        const url = 'https://de.pornhub.com/photo/3683968'

        expect(UrlParser.getPhotoID(id)).to.equal(id)
        expect(UrlParser.getPhotoID(url)).to.equal(id)
    })
})
