'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Video Search', () => {
    let result = null

    before(async () => {
        result = await pornhub.search('Video', 'tits', {
            page: 2,
            hd: true,
            order: 'Longest',
            production: 'homemade',
            durationMin: 20,
            durationMax: 30
        })
    })

    it('# paging', () => {
        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)
    })

    it('# counting', () => {
        expect(result.counting.from).to.equal(21)
        expect(result.counting.to).to.equal(40)
    })

    it('# run()', () => {
        expect(result.data.length).to.equal(20)
    })
})
