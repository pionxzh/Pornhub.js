import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Pornstar Info', () => {
    it('# run()', async () => {
        const url = 'https://www.pornhub.com/pornstar/eva-elfie'
        const result = await pornhub.pornstar(url)

        const {
            avatar,
            cover,
            rank,
            subscribers,
            videoViews,
            profileViews,
            pornstarProfileViews,
            videoWatched,
            uploadedVideoCount,
            taggedVideoCount,
            mostRecentVideos,
            uploadedVideos,
            ...restResult
        } = result

        expect(result.name).toBe('Eva Elfie')
        expect(avatar).not.to.be.empty
        expect(cover).not.toBe(0)
        expect(rank).not.toBe(0)
        expect(subscribers).not.toBe(0)
        expect(videoViews).not.toBe(0)
        expect(profileViews).not.toBe(0)
        expect(pornstarProfileViews).not.toBe(0)
        expect(videoWatched).not.toBe(0)
        expect(uploadedVideoCount).not.toBe(0)
        expect(taggedVideoCount).not.toBe(0)
        expect(mostRecentVideos).not.to.be.null
        expect(mostRecentVideos.length).not.to.be.equal(0)
        expect(uploadedVideos).not.to.be.null
        expect(uploadedVideos.length).not.to.be.equal(0)

        expect(restResult).toMatchSnapshot()
    })
})
