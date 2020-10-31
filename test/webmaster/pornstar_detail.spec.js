'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster getPornstarsDetail', () => {
    it('# run()', async () => {
        const result = await webMaster.getPornstarsDetail()

        expect(result[0].star_name).to.equal(' Melisa Wide')
        expect(result[0].gender).to.equal('female')
        expect(result.length).to.be.at.least(10000)
    })
})
