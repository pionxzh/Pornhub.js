import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster getPornstarsDetail', () => {
    it.skip('# run()', async () => {
        const result = await webMaster.getPornstarsDetail()

        expect(result[0].star_name).to.equal(', Arietta Adams')
        expect(result[0].gender).to.equal('female')
        expect(result.length).to.be.at.least(10000)
    })
})
