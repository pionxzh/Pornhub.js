import { PornHub } from '../src'

const pornhub = new PornHub()

const keyword = 'tits';

(async () => {
    const result = await pornhub.searchVideo(keyword)
    const firstVideo = result.data[0]

    const videoInfo = await pornhub.video(firstVideo.url)
    console.log(`Title: ${videoInfo.title}`)
})()
