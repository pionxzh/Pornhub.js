const PornHub = require('../src/pornhub')
const pornhub = new PornHub()

const keyword = 'tits'
pornhub.search('Video', keyword).then(res => {
    const list = res.data
    console.log(`Title: ${list[0].title}`)

    pornhub.video(list[0].url).then(res => {
        console.log(`Title: ${res.data.thumb}`)
        console.log(`Photo: ${res.data.thumb}`)
    })
})
