# PornHub.js
[![npm](https://img.shields.io/npm/v/pornhub.js.svg)](https://www.npmjs.com/package/pornhub.js)
[![Build Status](https://travis-ci.org/pionxzh/Pornhub.js.svg?branch=master)](https://travis-ci.org/pionxzh/Pornhub.js)
[![javascript style guide][standard-image]][standard-url]
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

![logo](images/logo.png)

A powerful Node.js lib to interact with [PornHub API](https://www.pornhub.com/).\
Easily get information and search for the `Video`/`Album`/`Gif`/`PornStar`.

[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

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
const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'
pornhub.video(url).then(res => {
    console.log(res.data)
    /* {
        title: 'Susie sheep fucks peppa pig',
        views: 49517,
        voteUp: 352,
        voteDown: 125,
        percent: '74%',
        provider: {
            username: TheFortniteVirginTheFortniteVirgin',
            url: '/users/thefortnitevirgin'
        },
        premium: false,
        tags: ['hardcore', 'hentai', 'memes', ...],
        categories: ['HD-Porn', 'SFW', ...],
        pornstars: [],
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

## Licence
[MIT](LICENSE)
