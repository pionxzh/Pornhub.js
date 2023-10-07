import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('PornstarList', () => {
    it('# run()', async () => {
        const result = await pornhub.pornstarList({
            page: 1,
            gender: 'female',
            order: 'No. of Videos',
        })

        expect(result.paging.current).to.equal(1)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.data.length).to.be.at.least(30)

        const first = result.data[0]
        expect(first.videoNum).to.be.at.least(3000)
    })
})
