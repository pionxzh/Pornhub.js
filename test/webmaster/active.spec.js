'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster isVideoActive', () => {
    const id = 'ph5ac81eabe203d'
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'

    it('# run() with id', async () => {
        const result = await webMaster.isVideoActive(id)

        expect(result).to.equal(true)
    })

    it('# run() with url', async () => {
        const result = await webMaster.isVideoActive(url)

        expect(result).to.equal(true)
    })
})
