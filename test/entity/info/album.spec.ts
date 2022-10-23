import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Album Info', () => {
    it('# run()', async () => {
        const url = 'https://www.pornhub.com/album/62066602'
        const result = await pornhub.album(url)

        expect(result.photos).to.have.lengthOf(16)

        const tagsMsg = 'Error in album tags.'
        expect(result.tags).to.include('public library', tagsMsg)

        const providerMsg = 'Error in album provider.'
        expect(result.provider.id).to.equal(176437741, providerMsg)
    })
})
