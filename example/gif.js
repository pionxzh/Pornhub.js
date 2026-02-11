const { PornHub } = require('pornhub.js')

async function gifExample() {
    const pornhub = new PornHub()

    try {
        // Get gif information by ID
        console.log('Getting gif info by ID...')
        const gif = await pornhub.gif('14596972')
        console.log({
            id: gif.id,
            title: gif.title,
            views: gif.views,
            mp4: gif.mp4,
            webm: gif.webm,
            sourceVideo: gif.sourceVideo
                ? {
                        title: gif.sourceVideo.title,
                        url: gif.sourceVideo.url,
                        timestamp: gif.sourceVideo.timestampFormatted,
                        timestampSeconds: gif.sourceVideo.timestampSeconds,
                    }
                : null,
            uploadDate: gif.uploadDate,
        })

        // Get gif information by URL
        console.log('\nGetting gif info by URL...')
        const gifByUrl = await pornhub.gif('https://www.pornhub.com/gif/14596972')
        console.log({
            id: gifByUrl.id,
            title: gifByUrl.title,
            views: gifByUrl.views,
        })
    }
    catch (error) {
        console.error('Error:', error.message)
    }
}

gifExample()
