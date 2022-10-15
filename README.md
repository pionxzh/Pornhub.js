# PornHub.js
![logo](images/logo.png)

[![npm](https://img.shields.io/npm/v/pornhub.js.svg)](https://www.npmjs.com/package/pornhub.js)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

Powerful PornHub API for Node.js\
Parse and search for `Video`/`Album`/`Gif`/`PornStar` on the fly.

## Getting Started

### Requirements

* Node.js >= 14

### Installation

```bash
npm install pornhub.js --save
pnpm install pornhub.js --save
yarn add pornhub.js
```

## Links
* [Document](/doc/DOCUMENT.md)
* [WebMaster API](/doc/WebMaster.md)

## Features
* **Parser**: Parse pages on pornhub: `Video`, `Album`, `Gif`, `PornStar`
* **Pagination**: Search API will give you the count of item and pagination info
* **Query**: Support all the search query parameters of pornhub
* **WebMaster**: Utilize the [WebMaster API](/doc/WebMaster.md) like a king :sunglasses:
  * This is an API for [webmaster](https://www.pornhub.com/webmasters) to get information from pornhub, which will give you more accurate data!
  * If this API can meet your needs, please use it instead of the normal API, because the normal API is not stable and may be blocked by pornhub.

## Usage

```js
import { PornHub } from 'pornhub.js'
// const { PornHub } = require('pornhub.js')
const pornhub = new PornHub()
```

### Search Video
```js
const result = pornhub.searchVideo('tokyo hot')
console.log(result.data[0]) // first video
```

<details>
  <summary><b>Result</b></summary>

```js
/* {
    title: 'Japanese Tokyo Hot',
    url: 'https://www.pornhub.com/view_video.php?viewkey=***',
    views: '14M',
    duration: '14:24',
    hd: true,
    premium: false,
    freePremium: false,
    preview: 'https://ci.phncdn.com/videos/***.jpg'
} */
```
</details>


### Getting Video Information
***Note***: download videos is currently unavailable due to the changes from pornhub.

```js
const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'
const video = await pornhub.video(url)
console.log(video)
```

<details>
  <summary><b>Result</b></summary>
```js
    /* {
        title: 'Japanese Tokyo Hot',
        views: 49517,
        duration: 1922,
        durationFormatted: '32:02'
        vote: { up: 64, down: 14, total: 78, rating: 0.82 },
        premium: false,
        thumb: 'data:image/gif...',
        provider: { username: 'wowgirls', url: '/users/wowgirls' },
        tags: ['hardcore', 'hentai', 'memes', ...],
        categories: ['HD-Porn', 'SFW', ...],
        pornstars: ['pig'],
        videos: [{
            quality: '720',
            filename: '720P_1500K_161102592.mp4',
            extension: 'mp4',
            url: ...
        }, {
            quality: '480',
            ...
        }, {
            ...
        }]
    } */
})
```
</details>

### More
See [DOCUMENT](/doc/DOCUMENT.md) for more information.

## License
[MIT](LICENSE)
