import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster getVideoEmbedCode', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5a9634c9a827e'

    it('# run()', async () => {
        const result = await webMaster.getVideoEmbedCode(url)

        expect(result).to.equal('<iframe src="https://www.pornhub.com/embed/ph5a9634c9a827e" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe>')
    })
})
