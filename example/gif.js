import { PornHub } from 'pornhub.js'

async function gifExample() {
    const pornhub = new PornHub()

    try {
        // Get gif information by ID
        console.log('Getting gif info by ID...')
        const gif = await pornhub.gif('53842061')
        console.log(gif)

        // Get gif information by URL
        console.log('\nGetting gif info by URL...')
        const gifByUrl = await pornhub.gif('https://www.pornhub.com/gif/53842061')
        console.log(gifByUrl)
    }
    catch (error) {
        console.error('Error:', error.message)
    }
}

gifExample()
