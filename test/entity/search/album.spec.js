'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Album Search', () => {
    let result = null

    before(async () => {
        result = await pornhub.search('Album', 'tits', {
            page: 2,
            segments: ['female', 'straight']
        })
    })

    it('# paging', async () => {
        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)
    })

    it('# counting', () => {
        expect(result.counting.from).to.equal(37)
        expect(result.counting.to).to.equal(72)
    })

    it('# run()', () => {
        expect(result.data.length).to.equal(36)
    })
})
