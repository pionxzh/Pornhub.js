# PornHub.js
![logo](images/logo.png)

[![npm](https://img.shields.io/npm/v/pornhub.js.svg)](https://www.npmjs.com/package/pornhub.js)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

Powerful PornHub API for Node.js

## Features
* **Parser**: Parse pages for `Video`, `Album`, `Photo`, `PornStar` and `Model`
* **Search**: Search for `Video`, `Album`, `Gif`, `PornStar` and `Model`, support all the query parameters
* **Pagination**: Support pagination for search results
* **WebMaster**: Utilize the [WebMaster API](/doc/WebMaster.md) from [Hubtraffic](https://www.hubtraffic.com) like a king :sunglasses:

## Documents
* [Document](/doc/DOCUMENT.md) for all the APIs and usages
* [Page Parser](/doc/Page.md) for `Video`, `Album`, `Photo`, `PornStar`, and `Model`
* [Search](/doc/Search.md) for `Video`, `Album`, `Gif`, `PornStar`, and `Model`
* [WebMaster API](/doc/WebMaster.md)
* **Migrate from v0.x to v1.x? Check [Migration Guide](/doc/MIGRATE.md)**
## Getting Started

### Requirements

* `Node.js` >= 14

### Installation

```bash
npm install pornhub.js --save
pnpm install pornhub.js --save
yarn add pornhub.js
```

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

```json5
{
  "title": "Japanese Tokyo Hot",
  "url": "https://www.pornhub.com/view_video.php?viewkey=***",
  "views": "14M",
  "duration": "14:24",
  "hd": true,
  "premium": false,
  "freePremium": false,
  "preview": "https://ci.phncdn.com/videos/***.jpg"
}
```
</details>


### Getting Video Information

```js
const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'
const video = await pornhub.video(url)
console.log(video)
```

<details>
  <summary><b>Result</b></summary>

```json5
{
  "title": "Japanese Tokyo Hot",
  "views": 49517,
  "duration": 1922,
  "durationFormatted": "32:02",
  "vote": { "up": 64, "down": 14, "total": 78, "rating": 0.82 },
  "premium": false,
  "thumb": "data:image/gif...",
  "provider": { "username": "wowgirls", "url": "/users/wowgirls" },
  "tags": ["hardcore", "hentai", "memes"],
  "categories": ["HD-Porn", "SFW"],
  "pornstars": ["pig"]
}
```
</details>

### More
See [DOCUMENT](/doc/DOCUMENT.md) for more information.

## Notice
* Please note that video downloading is **no longer supported**. We are unable to provide a download link due to the changes made by PornHub. However, you can still download videos using alternative tools such as [yt-dlp](https://github.com/yt-dlp/yt-dlp).


## License
[MIT](LICENSE)
