import { PornHub } from 'pornhub.js'

async function channelExample() {
    const pornhub = new PornHub()

    try {
        // Get channel information by name
        console.log('Getting channel info...')
        const channel = await pornhub.channel('brazzers')
        console.log(channel)
    }
    catch (error) {
        console.error('Error:', error.message)
    }
}

channelExample()
