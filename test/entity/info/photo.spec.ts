import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Photo Info', () => {
    it('# run()', async () => {
        const url = 'https://www.pornhub.com/photo/763180832'
        const result = await pornhub.photo(url)

        expect(result.info.title).to.equal('memes I thought of')
        expect(result.info.albumID).to.equal('65817052')
        expect(result.tags).to.include('funny')
        expect(result.provider.id).to.equal(1718270631)
    })
})
