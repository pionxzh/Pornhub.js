import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Pornstar Search', () => {
    it('# run()', async () => {
        const result = await pornhub.searchPornstar('kelly', {
            page: 1,
            order: 'No. of Video',
        })

        expect(result.paging.current).to.equal(1)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.counting.from).to.equal(1)
        expect(result.counting.to).to.equal(22)

        expect(result.data.length).to.equal(22)
    })
})
