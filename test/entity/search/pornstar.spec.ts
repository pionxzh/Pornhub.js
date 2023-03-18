import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Pornstar Search', () => {
    it('# run()', async () => {
        const result = await pornhub.searchPornstar('kelly', {
            page: 2,
            order: 'No. of Video',
        })

        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.counting.from).to.equal(23)
        expect(result.counting.to).to.equal(44)

        expect(result.data.length).to.equal(22)
    })
})
