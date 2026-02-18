import { PornHub } from 'pornhub.js'

async function videoExample() {
    const pornhub = new PornHub()

    try {
        // Get video information by ID
        console.log('Getting video info by ID...')
        const video = await pornhub.video('67b8704e975f6')
        console.log(video)
    }
    catch (error) {
        console.error('Error:', error.message)
    }
}

videoExample()
