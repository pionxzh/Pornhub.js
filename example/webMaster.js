const PornHub = require('../src/pornhub')
const pornhub = new PornHub()

const options = {
    page: 1,
    ordering: 'newest',
    period: 'alltime'
}
pornhub.webMaster.search('tits', options)
    .then(videos => {
        // Get all searched video information
        // **It would take lots of time, if you are not \
        // intended to crawl the result, don't do that **
        videos.forEach(async item => {
            const res = await pornhub.video(item.url)
            console.log(`Title: ${res.data.thumb}`)
        })
    })
