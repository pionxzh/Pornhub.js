# Document

- [Document](#Document)
  - [Get Video Info](#Get-Video-Info)
      - [Response structure](#Response-structure)
  - [Get Album Info](#Get-Album-Info)
  - [Get Photo Info](#Get-Photo-Info)
  - [Search](#Search)
    - [SearchType](#SearchType)
    - [Return Object](#Return-Object)
  - [Video Search](#Video-Search)
  - [Album Search](#Album-Search)
  - [GIF Search](#GIF-Search)
  - [PornStar Search](#PornStar-Search)
  - [Login / Logout](#Login--Logout)
  - [Custom Agent (Proxy)](#Custom-Agent-Proxy)

## Get Video Info
Get the video information from `view_video` page.

```js
pornhub.get(url)
// or
pornhub.video(url)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Page url or video ID |

```js
// https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d
pornhub.video('ph5ac81eabe203d').then(res => {
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

#### Response structure

<details>
  <summary>Click to show!</summary>

Default value is also the value returned when **NO DATA PRESENTED**.\
Be careful about handling the `null` stuffs.

| Name                   | Type            | Default | Description                                                                                                                        |
| ---------------------- | --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| vID                    | `string`        | `""`    | Video ID                                                                                                                           |
| status                 | `int`           | `200`   | Request status code                                                                                                                |
| data.title             | `string`        | `null`  | Video title                                                                                                                        |
| data.views             | `int`           | `null`  | Video view count                                                                                                                   |
| data.voteUp            | `int`           | `null`  | Video upVote count                                                                                                                 |
| data.voteDown          | `int`           | `null`  | Video downVote count                                                                                                               |
| data.percent           | `string`        | `null`  | Percentage of upVoting (Not **accurate**)                                                                                          |
| data.provider          | `object`        | `null`  | Video provider/uploader                                                                                                            |
| data.provider.url      | `string`        |         | Link to provider's account page                                                                                                    |
| data.provider.username | `string`        |         | Provider's username                                                                                                                |
| data.videos            | `Array`         | `[]`    | List of the videos. Sorted by descending(quality).                                                                                 |
| data.premium           | `boolean`       | `false` | Is this video premium only.<br>(Notice: Data like `views`, `votes` ... will not present if you don't have access to premium video) |
| data.tags              | `Array<string>` | `[]`    | example: `['couple', 'kissing']`                                                                                                   |
| data.pornstars         | `Array<string>` | `[]`    | example: `['Bob', 'John', 'Emily]`                                                                                                 |
| data.categories        | `Array<string>` | `[]`    | example: `['HD-Porn', 'Small-Tits']`                                                                                               |
</details>

## Get Album Info
```js
// pornhub.album('367633')
pornhub.album('https://www.pornhub.com/album/367633')
    .then(res => {
        console.log(res.data)
        /* {
            photos: [{
                url: 'https://www.pornhub.com/photo/3683964',
                views: '2.9K',
                rating: '96%',
                preview: '***.jpg'
            }, {
                url: 'https://www.pornhub.com/photo/3683965',
                views: '3.5K',
                ...
            }, ... ],
            tags: [ 'boobs', 'tits' ],
            provider: {
                username: 'littlewilly123',
                url: '/users/littlewilly123',
                id: 2757342
            }
        } */
    })
```

## Get Photo Info

```js
// pornhub.photo('3683968')
pornhub.photo('https://www.pornhub.com/photo/3683968')
    .then(res => {
        console.log(res.data)
        /* {
            info: {
                title: 'My HOT sister ;)',
                views: 6170,
                rating: '94%',
                albumID: 367633,
                url: '***.jpg' },
            tags: [ 'boobs', 'tits' ],
            provider: {
                username: 'littlewilly123',
                url: '/users/littlewilly123',
                id: 2757342
            }
        } */
```

## Search

`Pornhub.search(searchType, keyword, query?)`

### SearchType
SearchType is **case-insensitive**.
>
* `"Video"` | `"Gif"` | `"Album"` | `"Pornstar"`

### Return Object
* Data
  * Would be different by each search type.
* Pagination
```js
pornhub.search(type, keyword, query).then(res => {
    console.log(res.paging)
    // { current: 2, maxPage: 10, isEnd: false }
})
```
* Counting
```js
pornhub.search(type, keyword, query).then(res => {
    console.log(res.counting)
    // showing 35-68 of total 220966 data records.
    // { from: 35, to: 68, total: 220966 }
})
```

## Video Search

`pornhub.search('Video', keyword, options?)`

| Options     | Type      | Description                                                                             |
| ----------- | --------- | --------------------------------------------------------------------------------------- |
| page        | `int`     | Show which page of search result                                                        |
| order       | `string`  | `"Most Relevant"` \| `"Most Recent"` \| `"Most Viewed"` \| `"Top Rated"` \| `"Longest"` |
| hd          | `boolean` | show HD video only or not                                                               |
| production  | `string`  | `"professional"` \| `"homemade"`                                                        |
| durationMin | `int`     | `10` \| `20` \| `30`                                                                    |
| durationMax | `int`     | `10` \| `20` \| `30`                                                                    |

```js
const options = {
    page: 2,
    production: 'professional',
    durationMin: 10,
    durationMax: 30
}

pornhub.search('Video', 'tokyo hot', options)
    .then(res => {
        console.log(res.paging)
        // { current: 2, maxPage: 10, isEnd: false }
        console.log(res.counting)
        // { from: 35, to: 68, total: 220966 }

        res.data.forEach(item => {
            console.log(item)
            /* {
                title: 'tokyo hot ep1',
                url: 'https://www.pornhub.com/view_video.php?viewkey=***',
                duration: '21:43',
                hd: true,
                premium: false,
                preview: 'https://ci.phncdn.com/videos/***.jpg'
            } */
        })
    })
```
Be careful, the `paging.maxPage` is not **ACCURATE**.\
If you really want to know this information, you can calculate it by `res.counting.total / 20` (divide the amount of video search results per page).

## Album Search

`pornhub.search('Album', keyword, options?)`

| Options  | Type                        | Description                                                                                                                            |
| -------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| page     | `int`                       | Show which page of search result                                                                                                       |
| order    | `string`                    | `"Most Relevant"` \| `"Most Recent"` \| `"Most Viewed"` \| `"Top Rated"`                                                               |
| verified | `boolean`                   | Show verified video                                                                                                                    |
| segments | `string` \| `Array<string>` | Default: &nbsp;`female-straight-uncategorized`<br>Options: `female`, `straight`, `male`, `gay`, `transgender`, `misc`, `uncategorized` |

```js
const options = {
    segments: ['female', 'straight']
}
pornhub.search('Album', 'tokyo hot', options).then(res => {
    console.log(res.paging)
    // { current: 1, maxPage: 10, isEnd: false }
    console.log(res.counting)
    // { from: 1, to: 36, total: 899 }

    res.data.forEach(item => {
        console.log(item)
        /* {
            title: 'tokyo hot n0473',
            url: 'https://www.pornhub.com/album/***',
            rating: '100%',
            preview: 'https://ci.phncdn.com/***.jpg'
        } */
    })
})
```

## GIF Search

`pornhub.search('Gif', keyword, options?)`

| Options           | Type     | Description                                                              |
| ----------------- | -------- | ------------------------------------------------------------------------ |
| page              | `int`    | Show which page of search result                                         |
| order             | `string` | `"Most Relevant"` \| `"Most Recent"` \| `"Most Viewed"` \| `"Top Rated"` |
| sexualOrientation | `string` | `"gay"` \| `"transgender"`                                               |

```js
const options = {
    sexualOrientation: 'gay'
}
pornhub.search('Gif', 'tokyo hot', options).then(res => {
    console.log(res.paging)
    // { current: 1, maxPage: 10, isEnd: false }
    console.log(res.counting)
    // { from: 1, to: 34, total: 142017 }

    res.data.forEach(item => {
        console.log(item)
        /* {
            title: 'hot',
            url: 'https://www.pornhub.com/gif/14579302',
            mp4: 'https://cl.phncdn.com/pics/gifs/***.mp4',
            webm: 'https://cl.phncdn.com/pics/gifs/***.webm',
            preview: 'https://cl.phncdn.com/pics/gifs/***.jpg'
        } */
    })
})
```

## PornStar Search

`pornhub.search('Pornstar', keyword, options?)`

| Options | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| page    | `int`    | Show which page of search result                                             |
| order   | `string` | `"Most Relevant"` \| `"Most Popular"` \| `"Most Viewed"` \| `"No. of Video"` |

```js
const options = {
    page: 1,
    order: 'Most Relevant'
}
pornhub.search('Pornstar', 'kelly', options).then(res => {
    console.log(res.paging)
    // { current: 1, maxPage: 5, isEnd: false }
    console.log(res.counting)
    // { from: 1, to: 22, total: 93 }

    res.data.forEach(item => {
        console.log(item)
        /* {
            name: 'Kelly Kelly',
            url: 'https://www.pornhub.com/pornstar/kelly-kelly',
            views: '2.3M',
            videoNum: 31,
            rank: 4069,
            photo: 'https://ci.phncdn.com/pics/pornstars/default/female.jpg'
        } */
    })
})
```

## Login / Logout
You can log in to PornHub to gain access to **premium video**. (if you own a premium account)
```js
pornhub.on('loggedIn', () => {
    /* do something after login */
})

pornhub.login(account, password)
```
or
```js
pornhub.login(account, password)
    .then(result => {
        if (!result.success) return

        /* do something after login */

        pornhub.logout()
    })
```

## Custom Agent (Proxy)
You can set the custom `agent` to achieve something like `Proxy`.\
For more information, please have a look at [node-https-proxy-agent](https://github.com/TooTallNate/node-https-proxy-agent).

```
npm install https-proxy-agent --save
```
```js
const HttpsProxyAgent = require('https-proxy-agent')
const proxy = 'https://xxx.xxx.xxx.xxx:xx'
const httpsAgent = new HttpsProxyAgent(proxy)

pornhub.setAgent(httpsAgent)
```
