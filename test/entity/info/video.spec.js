'use strict'
const expect = require('chai').expect
const PornHub = require('../../../src/pornhub')
const pornhub = new PornHub()

describe('Video Info', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph62f79e2ed1ed8'

    let result = null
    before(async () => {
        result = await pornhub.video(url)
    })

    it('# run()', () => {
        expect(result.data.title).to.equal('【張旭老師 2022 最新作品】台聯大 108 轉學考微積分 A2 卷甲#6｜#數學老師張旭｜板妹 ig：forever.love0618｜#changhsumath666｜#forever.love')
        expect(result.data.views).to.be.at.least(13000)
        expect(result.data.vote.total).to.be.at.least(5)
        expect(result.data.premium).to.be.equal(false)
        expect(result.data.duration).to.equal('09:09')
        // video can only be access after logged in
        expect(result.data.videos).to.have.lengthOf(0)
        expect(result.data.provider).to.be.not.equal(null)
        expect(result.data.tags.length).to.be.at.least(5)
        /* eslint-disable no-unused-expressions */
        expect(result.data.pornstars).to.be.empty
        expect(result.data.categories.length).to.be.at.least(4)
        expect(result.data.categories.length).to.be.at.least(2)
    })
})
