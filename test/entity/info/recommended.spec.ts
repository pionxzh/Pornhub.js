import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Recommended Videos', () => {
    it.skip('# run()', async () => {
        const result = await pornhub.recommendedVideos({
            page: 2,
            order: 'Most Relevant',
        })

        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.data.length).to.equal(21)

        expect(result.data[0].views).to.be.not.empty
    })
})
