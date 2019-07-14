'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Video Info', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'

    let result = null
    before(async () => {
        result = await pornhub.video(url)
    })

    it('# run()', () => {
        expect(result.data.title).to.equal('Susie sheep fucks peppa pig')
        expect(result.data.views).to.be.at.least(50000)
        expect(result.data.vote.total).to.be.at.least(400)
        expect(result.data.premium).to.equal(false)
        expect(result.data.duration).to.equal('0:44')
        expect(result.data.videos).to.have.lengthOf(3)
        expect(result.data.provider).to.be.not.equal(null)
        expect(result.data.tags.length).to.be.at.least(9)
        /* eslint-disable no-unused-expressions */
        expect(result.data.pornstars).to.be.empty
        expect(result.data.categories.length).to.be.at.least(2)
    })
})
