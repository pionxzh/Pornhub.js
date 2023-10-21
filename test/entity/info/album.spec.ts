import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Album Info', () => {
    it('# run()', async () => {
        const url = 'https://www.pornhub.com/album/7529441'
        const result = await pornhub.album(url)

        expect(result.title).to.equal('Speaks for Me')

        expect(result.photos).to.have.lengthOf(18)

        expect(result.tags).to.include('meme')

        expect(result.provider.id).to.equal(93264101)
    })
})
