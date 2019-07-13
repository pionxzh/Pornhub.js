'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Album Info', () => {
    const id = '367633'
    const url = 'https://www.pornhub.com/album/367633'

    let result = null
    before(async () => {
        result = await pornhub.album(url)
    })

    it('# id should be parsed from url', () => {
        expect(result.id).to.equal(id)
    })

    it('# run()', () => {
        expect(result.data.photos).to.have.lengthOf(16)

        const tagsMsg = 'Error in album tags.'
        expect(result.data.tags).to.include('tits', tagsMsg)

        const providerMsg = 'Error in album provider.'
        expect(result.data.provider.id).to.equal(2757342, providerMsg)
    })
})
