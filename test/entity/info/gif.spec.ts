import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Gif Info', () => {
    it('# should get gif information by ID', async () => {
        // Using a sample gif ID from the documentation
        const result = await pornhub.gif('14596972')

        expect(result.id).to.equal('14596972')
        expect(result.url).to.include('/gif/14596972')
        expect(result.title).to.be.a('string')
        expect(result.views).to.be.a('number')
        expect(result.vote).to.have.property('up')
        expect(result.vote).to.have.property('down')
        expect(result.vote).to.have.property('total')
        expect(result.vote).to.have.property('rating')
        expect(result.mp4).to.be.a('string')
        expect(result.webm).to.be.a('string')
        expect(result.uploadDate).to.be.instanceOf(Date)
        // sourceVideo might be null if the gif doesn't have a source video
        if (result.sourceVideo) {
            expect(result.sourceVideo.title).to.be.a('string')
            expect(result.sourceVideo.url).to.be.a('string')
            expect(result.sourceVideo.timestampSeconds).to.be.a('number')
            expect(result.sourceVideo.timestampFormatted).to.be.a('string')
        }
    })

    it('# should get gif information by URL', async () => {
        const result = await pornhub.gif('https://www.pornhub.com/gif/14596972')

        expect(result.id).to.equal('14596972')
        expect(result.url).to.include('/gif/14596972')
        expect(result.title).to.be.a('string')
        expect(result.views).to.be.a('number')
        expect(result.mp4).to.be.a('string')
        expect(result.webm).to.be.a('string')
    })
})
