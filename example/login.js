const PornHub = require('../src/pornhub')
const pornhub = new PornHub()

const account = 'xxxxx'
const password = 'xxxxx'

pornhub.on('loggedIn', () => {
    pornhub.video('ph5ac81eabe203d').then(res => {
        console.log(`Title: ${res.data.thumb}`)
        console.log(`Photo: ${res.data.thumb}`)
    })

    pornhub.album('https://www.pornhub.com/album/367633').then(res => {
        console.log(res.data)
    })
})

pornhub.login(account, password)
