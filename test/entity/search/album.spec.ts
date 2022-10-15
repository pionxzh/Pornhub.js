import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Album Search', () => {
    it('# run()', async () => {
        const result = await pornhub.searchAlbum('tits', {
            page: 2,
            segments: ['female', 'straight'],
        })

        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.counting.from).to.equal(37)
        expect(result.counting.to).to.equal(72)

        expect(result.data.length).to.equal(36)
    })
})
