import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster getTags', () => {
    it.skip('# run()', async () => {
        const result = await webMaster.getTags('a')

        expect(result[0]).to.equal('a')
        expect(result.length).to.be.at.least(200000)
    })
})
