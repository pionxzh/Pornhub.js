'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster Video', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5a39da93ef622'

    it('# run()', async () => {
        const result = await webMaster.getVideo(url)

        expect(result.title).to.equal('peppa pig and steve have a sex with each other together')
        expect(result.views).to.be.at.least(70000)
        expect(result.vote.total).to.be.at.least(800)
        expect(result.duration).to.equal('0:20')
        expect(result.tags.length).to.be.at.least(2)
        /* eslint-disable no-unused-expressions */
        expect(result.pornstars).to.be.empty
        expect(result.categories.length).to.be.at.least(4)
    })
})
