'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster getTags', () => {
    it('# run()', async () => {
        const result = await webMaster.getTags('a')

        expect(result[0]).to.equal('a')
        expect(result.length).to.be.at.least(200000)
    })
})
