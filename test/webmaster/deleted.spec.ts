import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster getDeletedVideos', () => {
    it('# run()', async () => {
        const result = await webMaster.getDeletedVideos()

        expect(result.length).to.equal(30)
    })
})
