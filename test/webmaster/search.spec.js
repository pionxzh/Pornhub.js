'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster search', () => {
    it('# run()', async () => {
        const options = {
            ordering: 'mostviewed',
            period: 'alltime',
            page: 1
        }
        const result = await webMaster.search('peppa pig', options)

        expect(result.length).to.equal(30)
    })
})
