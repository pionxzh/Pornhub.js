import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Model Info', () => {
    it('Luna Okko model data', async () => {
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
            uploadedVideoCount,
            taggedVideoCount,
            mostRecentVideos,
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
        expect(uploadedVideoCount).not.toBe(0)
        expect(taggedVideoCount).toBe(0)
        expect(mostRecentVideos).not.to.be.null
        expect(mostRecentVideos.length).not.to.be.equal(0)

        expect(restResult).toMatchSnapshot()
    })

    it('Luna Okko videos', async () => {
        const url = 'https://www.pornhub.com/model/teacher-of-magic'
        const result = await pornhub.modelVideos(url, { page: 2 })

        expect(result.data.length).to.be.greaterThan(0)
    })
})
