import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('VideoList', () => {
    it('# run()', async () => {
        const result = await pornhub.videoList({
            page: 1,
            order: 'Longest',
        })

        expect(result.paging.current).to.equal(1)
        expect(result.paging.isEnd).to.equal(false)

        expect(result.data.length).to.be.a('number')

        const first = result.data[0]
        expect(first.title).to.be.a('string')
        expect(first.title).to.be.not.empty

        expect(first.views).to.be.a('string')
        expect(first.views).to.be.not.empty
    })
})
