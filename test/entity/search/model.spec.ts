import { describe, expect, it } from 'vitest'
import { PornHub } from '../../../src/index'

const pornhub = new PornHub()

describe('Model Search', () => {
    it('# run()', async () => {
        const result = await pornhub.searchModel('okko')

        expect(result.length).to.equal(10)
        expect(result[0].name).to.equal('Luna Okko')
        expect(result[0].url).to.equal('https://www.pornhub.com/model/luna-okko')
    })
})
