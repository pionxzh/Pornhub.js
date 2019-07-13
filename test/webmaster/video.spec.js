'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster Video', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'

    it('# run()', async () => {
        const result = await webMaster.getVideo(url)

        expect(result.title).to.equal('Susie sheep fucks peppa pig')
        expect(result.views).to.be.at.least(50000)
        expect(result.vote.total).to.be.at.least(400)
        expect(result.duration).to.equal('0:44')
        expect(result.publishDate).to.be.equal('2018-10-02 00:10:05')
        expect(result.tags.length).to.be.at.least(9)
        /* eslint-disable no-unused-expressions */
        expect(result.pornstars).to.be.empty
        expect(result.categories.length).to.be.at.least(2)
    })
})
