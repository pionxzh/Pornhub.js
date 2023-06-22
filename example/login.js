import { PornHub } from 'pornhub.js'

const pornhub = new PornHub()

const account = 'xxxxx'
const password = 'xxxxx';

(async () => {
    await pornhub.login(account, password)

    const result = await pornhub.video('ph5a9634c9a827e')
    console.log(`Title: ${result.data.title}`)
})()
