const { PornHub } = require('pornhub.js')

async function debugGifExample() {
    const pornhub = new PornHub()

    console.log('🔍 Starting GIF debugging example...')
    console.log('This will log the entire HTML and parsed data for debugging')
    console.log('='.repeat(50))

    try {
        // Test with a sample gif ID - all the detailed logging will appear
        const _gif = await pornhub.gif('53842061')

        console.log('✅ Successfully retrieved GIF data!')
        console.log('You should see detailed HTML and parsing logs above.')
    }
    catch (error) {
        console.error('❌ Error occurred:')
        console.error('Error message:', error.message)
        console.error('Stack trace:', error.stack)
    }
}

// Run the debug example
debugGifExample()
