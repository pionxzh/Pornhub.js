import { PornHub } from '../src'

const pornhub = new PornHub()

const options = {
    page: 1,
    ordering: 'newest',
    period: 'alltime',
};

(async () => {
    const result = await pornhub.webMaster.search('tits', options)

    // Get all searched video information
    // **It would take lots of time, if you are not \
    // intended to crawl the result, don't do this **
    result.data.forEach(async (item) => {
        const res = await pornhub.video(item.url)
        console.log(`Title: ${res.data.thumb}`)
    })
})()
