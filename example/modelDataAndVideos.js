const { PornHub } = require('../dist');

(async () => {
    let pornHub = new PornHub()
    const lunaOkko = await pornHub.model('https://www.pornhub.com/model/luna-okko')

    console.log(lunaOkko.name)
    console.log(lunaOkko.about)
    console.log(lunaOkko.bio)
    for (const video of lunaOkko.mostRecentVideos) {
        console.log(`${video.id} ${video.title} ${video.url}`)
    }

    let hasMore = false
    let pageCounter = 1
    do {
        pornHub = new PornHub()
        const {
            data: videos,
            paging,
        } = await pornHub.modelVideos('https://www.pornhub.com/model/teacher-of-magic', { page: pageCounter })

        for (const video of videos) {
            console.log(`${video.id} ${video.title} ${video.url}`)
        }

        pageCounter++
        hasMore = !paging.isEnd
    } while (hasMore)
})()
