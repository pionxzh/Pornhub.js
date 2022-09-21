'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Album Info', () => {
    const url = 'https://www.pornhub.com/album/62066602'

    let result = null
    before(async () => {
        result = await pornhub.album(url)
    })

    it('# run()', () => {
        expect(result.data.photos).to.have.lengthOf(16)

        const tagsMsg = 'Error in album tags.'
        expect(result.data.tags).to.include('public library', tagsMsg)

        const providerMsg = 'Error in album provider.'
        expect(result.data.provider.id).to.equal(176437741, providerMsg)
    })
})
