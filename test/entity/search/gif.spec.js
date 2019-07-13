'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Gif Search', () => {
    let result = null

    before(async () => {
        result = await pornhub.search('Gif', 'tits', {
            page: 2,
            order: 'Most Viewed',
            sexualOrientation: 'gay'
        })
    })

    it('# paging', () => {
        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)
    })

    it('# counting', () => {
        expect(result.counting.from).to.equal(35)
        expect(result.counting.to).to.equal(68)
    })

    it('# run()', () => {
        expect(result.data.length).to.equal(34)
    })
})
