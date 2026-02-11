const { PornHub } = require('pornhub.js')

async function advancedGifExample() {
    const pornhub = new PornHub()

    try {
        // Get gif information with source video data
        console.log('Getting gif info with source video data...')
        const gif = await pornhub.gif('14596972')

        console.log('GIF Information:')
        console.log(`- Title: ${gif.title}`)
        console.log(`- Views: ${gif.views}`)
        console.log(`- Rating: ${gif.vote.up}/${gif.vote.total} (${Math.round(gif.vote.rating * 100)}%)`)
        console.log(`- Upload Date: ${gif.uploadDate}`)

        console.log('\nMedia URLs:')
        console.log(`- MP4: ${gif.mp4}`)
        console.log(`- WebM: ${gif.webm}`)

        if (gif.sourceVideo) {
            console.log('\nSource Video Information:')
            console.log(`- Title: ${gif.sourceVideo.title}`)
            console.log(`- URL: ${gif.sourceVideo.url}`)
            console.log(`- Timestamp: ${gif.sourceVideo.timestampFormatted} (${gif.sourceVideo.timestampSeconds} seconds)`)
        }
        else {
            console.log('\nNo source video information available for this GIF')
        }

        if (gif.tags.length > 0) {
            console.log('\nTags:', gif.tags.join(', '))
        }

        if (gif.provider) {
            console.log(`\nCreated by: ${gif.provider.username}`)
        }
    }
    catch (error) {
        console.error('Error:', error.message)
    }
}

advancedGifExample()
