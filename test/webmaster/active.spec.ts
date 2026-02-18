import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster isVideoActive', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=6583bff87aef8'

    it('# run()', async () => {
        const result = await webMaster.isVideoActive(url)

        expect(result).to.equal(true)
    })
})
