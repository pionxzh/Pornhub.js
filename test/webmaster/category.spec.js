'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster getCategories()', () => {
    it('# run()', async () => {
        const result = await webMaster.getCategories()

        expect(result[0].id).to.equal('1')
        expect(result[0].category).to.equal('asian')
        expect(result.length).to.be.at.least(50)
    })
})
