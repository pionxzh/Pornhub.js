# PornHub.js
[![javascript style guide][standard-image]][standard-url]
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

A powerful Node.js lib to interact with [PornHub API](https://www.pornhub.com/).\
Easily get information from page and search around the `Video`/`Album`/`Gif`/`PornStar`.

[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com
[repository-url]: https://github.com/pionxzh/pornhub.js
[issue-url]: https://github.com/pionxzh/pornhub.api/issues
## Getting Started

### Requirements

* Node.js >= 8.x

### Installation

```bash
npm install pornhub.js --save
```

## Links
* [Document](/doc/DOCUMENT.md)
* [WebMaster API](/doc/WebMaster.md)

## Usage

### Search
```js
const PornHub = require('pornhub.js')
const pornhub = new PornHub()

pornhub.search('Video', 'tokyo hot').then(res => {
    res.data.forEach(item => {
        console.log(item)
        /* {
            title: 'Japanese Tokyo Hot',
            url: 'https://www.pornhub.com/view_video.php?viewkey=***',
            duration: '14:24',
            hd: true,
            premium: false,
            preview: 'https://ci.phncdn.com/videos/***.jpg'
        } */
    })
})
```

### Getting Video Information
You can print out all the video download links.

```js
pornhub.video(url).then(res => {
    const videoList = res.data.videos.map(item => item.url)
    console.log(videoList)
})
```

## Licence
[MIT](LICENSE)
