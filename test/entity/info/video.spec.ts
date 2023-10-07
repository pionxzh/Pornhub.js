import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Video Info', () => {
    it('# run()', async () => {
        const url = 'https://www.pornhub.com/view_video.php?viewkey=ph62f79e2ed1ed8'
        const result = await pornhub.video(url)

        expect(result.title).to.includes('Cowgirl')
        expect(result.views).to.be.at.least(13000)
        expect(result.vote.total).to.be.at.least(10000)
        expect(result.premium).to.be.equal(false)
        expect(result.duration).to.equal(855)
        expect(result.durationFormatted).to.equal('14:15')
        expect(result.provider).not.to.be.empty
        expect(result.provider?.username).toBe('Hansel Grettel')
        expect(result.provider?.url).toBe('/model/hansel-grettel')

        expect(result.mediaDefinitions.length).to.be.at.least(2)

        expect(result.tags.length).to.be.at.least(10)

        expect(result.pornstars).to.be.empty
        expect(result.categories.length).to.be.at.least(10)
        expect(result.uploadDate).not.to.be.null
    })
})
