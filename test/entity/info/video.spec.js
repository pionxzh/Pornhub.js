'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Video Info', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5a39da93ef622'

    let result = null
    before(async () => {
        result = await pornhub.video(url)
    })

    it('# run()', () => {
        expect(result.data.title).to.equal('Peppa Pig and Steve have a Sex with each other together')
        expect(result.data.views).to.be.at.least(70000)
        expect(result.data.vote.total).to.be.at.least(800)
        expect(result.data.premium).to.be.equal(false)
        expect(result.data.duration).to.equal('0:20')
        // video can only be access after logged in
        expect(result.data.videos).to.have.lengthOf(0)
        expect(result.data.provider).to.be.not.equal(null)
        expect(result.data.tags.length).to.be.at.least(2)
        /* eslint-disable no-unused-expressions */
        expect(result.data.pornstars).to.be.empty
        expect(result.data.categories.length).to.be.at.least(4)
        expect(result.data.categories.length).to.be.at.least(2)
    })
})
