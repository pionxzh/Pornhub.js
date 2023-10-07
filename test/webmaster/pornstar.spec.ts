import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster getPornstars', () => {
    it('# run()', async () => {
        const result = await webMaster.getPornstars()

        expect(result[0].toLowerCase()).to.equal('033120 mpp2')
        expect(result.length).to.be.at.least(10000)
    })
})
