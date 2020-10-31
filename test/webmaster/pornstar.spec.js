'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster getPornstars', () => {
    it('# run()', async () => {
        const result = await webMaster.getPornstars()

        expect(result[0]).to.equal(' Vixxen Goddess')
        expect(result.length).to.be.at.least(10000)
    })
})
