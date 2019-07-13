'use strict'
const expect = require('chai').expect
const PornHub = require('../../src/pornhub')
const webMaster = new PornHub().webMaster

describe('WebMaster getVideoEmbedCode', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'

    it('# run()', async () => {
        const result = await webMaster.getVideoEmbedCode(url)

        expect(result).to.equal('<iframe src="https://www.pornhub.com/embed/ph5ac81eabe203d" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe>')
    })
})
