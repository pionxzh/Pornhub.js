import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Model Info', () => {
    it('# run()', async () => {
        const url = 'https://www.pornhub.com/model/luna-okko'
        const result = await pornhub.model(url)

        const {
            avatar,
            cover,
            rank,
            subscribers,
            videoViews,
            profileViews,
            videoWatched,
            ...restResult
        } = result

        expect(result.name).toBe('Luna Okko')
        expect(avatar).not.to.be.empty
        expect(cover).not.toBe(0)
        expect(rank).not.toBe(0)
        expect(subscribers).not.toBe(0)
        expect(videoViews).not.toBe(0)
        expect(profileViews).not.toBe(0)
        expect(videoWatched).not.toBe(0)

        expect(restResult).toMatchSnapshot()
    })
})
