import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Video Search', () => {
    it('# run()', async () => {
        const result = await pornhub.searchVideo('tits', {
            page: 2,
            hd: true,
            order: 'Longest',
            production: 'homemade',
            durationMin: 20,
            durationMax: 30,
        })

        expect(result.paging.current).to.equal(2)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.counting.from).to.equal(21)
        expect(result.counting.to).to.equal(40)

        expect(result.data.length).to.equal(20)
    })
})
