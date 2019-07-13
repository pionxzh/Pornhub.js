'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Photo Info', () => {
    const id = '3683968'
    const url = 'https://www.pornhub.com/photo/3683968'

    let result = null
    before(async () => {
        result = await pornhub.photo(url)
    })

    it('# id should be parsed from url', () => {
        expect(result.id).to.equal(id)
    })

    it('# run()', () => {
        expect(result.data.info.title).to.equal('My HOT sister ;)')
        expect(result.data.info.albumID).to.equal('367633')
        expect(result.data.tags).to.include('tits')
        expect(result.data.provider.id).to.equal(2757342)
    })
})
