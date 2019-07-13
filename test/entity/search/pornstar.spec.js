'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Pornstar Search', () => {
    let result = null

    before(async () => {
        result = await pornhub.search('Pornstar', 'kelly', {
            page: 2,
            order: 'No. of Video'
        })
    })

    it('# paging', () => {
        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)
    })

    it('# counting', () => {
        expect(result.counting.from).to.equal(23)
        expect(result.counting.to).to.equal(44)
    })

    it('# run()', () => {
        expect(result.data.length).to.equal(22)
    })
})
