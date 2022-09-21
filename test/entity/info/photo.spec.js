'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Photo Info', () => {
    const url = 'https://www.pornhub.com/photo/763180832'

    let result = null
    before(async () => {
        result = await pornhub.photo(url)
    })

    it('# run()', () => {
        expect(result.data.info.title).to.equal('memes I thought of')
        expect(result.data.info.albumID).to.equal('65817052')
        expect(result.data.tags).to.include('funny')
        expect(result.data.provider.id).to.equal(1718270631)
    })
})
