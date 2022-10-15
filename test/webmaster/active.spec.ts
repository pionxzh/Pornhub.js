import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster isVideoActive', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph625ad0e4c915f'

    it('# run()', async () => {
        const result = await webMaster.isVideoActive(url)

        expect(result).to.equal(true)
    })
})
