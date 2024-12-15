import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Photo Info', () => {
    it('# run()', async () => {
        const url = 'https://www.pornhub.com/photo/842369471'
        const result = await pornhub.photo(url)

        expect(result.info.title).to.equal('Mini Bun is your hentai waifu')
        expect(result.info.albumID).to.equal('77971261')
        expect(result.tags).to.include('cosplay')
        expect(result.provider.id).to.equal(2624142831)
    })
})
