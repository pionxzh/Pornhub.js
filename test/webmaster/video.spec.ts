import { describe, expect, it } from 'vitest'
import { PornHub } from '../../src/index'

const webMaster = new PornHub().webMaster

describe('WebMaster Video', () => {
    const url = 'https://www.pornhub.com/view_video.php?viewkey=ph62866642dc560'

    it.skip('# run()', async () => {
        const result = await webMaster.getVideo(url)

        expect(result.title).to.equal('【張旭老師 2022 最新作品】台聯大 108 轉學考微積分 A2 卷甲#6｜#數學老師張旭｜板妹 ig：forever.love0618｜#changhsumath666｜#forever.love')
        expect(result.views).to.be.at.least(12000)
        expect(result.vote.total).to.be.at.least(10)
        expect(result.duration).to.equal('9:09')
        expect(result.tags.length).to.be.at.least(6)

        expect(result.pornstars).to.be.empty
        expect(result.categories.length).to.be.at.least(5)
    })
})
