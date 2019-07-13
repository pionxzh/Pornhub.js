'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster getDeletedVideos', () => {
    it('# run()', async () => {
        const result = await webMaster.getDeletedVideos()

        expect(result.length).to.equal(30)
    })
})
