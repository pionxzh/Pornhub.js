import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Gif Search', () => {
    it('# run()', async () => {
        const result = await pornhub.searchGif('tits', {
            page: 1,
            sexualOrientation: 'transgender',
        })

        expect(result.paging.current).to.equal(1)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.counting.from).to.equal(1)
        expect(result.counting.to).to.greaterThanOrEqual(27)

        expect(result.data.length).to.greaterThanOrEqual(27)
    })
})
