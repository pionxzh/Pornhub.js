# Document

- [Document](#document)
- [Page parsing](#page-parsing)
  - [Get Video Info](#get-video-info)
  - [Get Album Info](#get-album-info)
  - [Get Photo Info](#get-photo-info)
  - [Get Pornstar Info](#get-pornstar-info)
  - [Get Model Info](#get-model-info)
- [Search](#search)
    - [Response Structure](#response-structure)
  - [Video Search](#video-search)
  - [Album Search](#album-search)
  - [GIF Search](#gif-search)
  - [PornStar Search](#pornstar-search)
  - [Model Search](#model-search)
- [AutoComplete](#autocomplete)
- [Get Token](#get-token)
- [Login / Logout](#login--logout)
- [Custom Agent (Proxy)](#custom-agent-proxy)
- [Route](#route)

# Page parsing

## Get Video Info
Accept both ID and Url

```js
// https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d
const video = await pornhub.video('ph5ac81eabe203d')
console.log(video)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Video ID or page url |

<details>
  <summary><b>Result</b></summary>

```js
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
```
</details>

<details>
  <summary><b>Response Type</b></summary>

| Name              | Type            | Description                                                                                                                        |
| ----------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| id                | `string`        | Video ID                                                                                                                           |
| title             | `string`        | Video title                                                                                                                        |
| views             | `int`           | Video view count                                                                                                                   |
| vote.up           | `int`           | UpVote count                                                                                                                       |
| vote.down         | `int`           | DownVote count                                                                                                                     |
| vote.total        | `int`           | TotalVote count                                                                                                                    |
| vote.rating       | `float`         | Percentage of UpVote (Not **accurate**)                                                                                            |
| premium           | `boolean`       | Is this video premium only.<br>(Notice: Data like `views`, `votes` ... will not present if you don't have access to premium video) |
| provider          | `object`        | Video provider/uploader                                                                                                            |
| provider.username | `string`        | Provider's username                                                                                                                |
| provider.url      | `string`        | Provider's account page                                                                                                            |
| videos            | `Array`         | List of the videos. Sorted by quality(low->hight).                                                                                 |
| tags              | `Array<string>` | example: `['couple', 'kissing']`                                                                                                   |
| pornstars         | `Array<string>` | example: `['Bob', 'John', 'Emily]`                                                                                                 |
| categories        | `Array<string>` | example: `['HD-Porn', 'Small-Tits']`                                                                                               |
</details>

## Get Album Info
Accept both ID and Url

```js
// https://www.pornhub.com/album/367633
const album = await pornhub.album('367633')
console.log(album)
```

<details>
  <summary><b>Result</b></summary>

```js
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
        id: 2757342,
        username: 'littlewilly123',
        url: '/users/littlewilly123'
    }
} */
```
</details>

## Get Photo Info
Accept both ID and Url

```js
// pornhub.photo('3683968')
const photo = await pornhub.photo('https://www.pornhub.com/photo/3683968')
console.log(photo)
```

<details>
  <summary><b>Result</b></summary>

```js
/* {
    info: {
        title: 'My HOT sister ;)',
        views: 6170,
        rating: '94%',
        albumID: 367633,
        url: '***.jpg' },
    tags: [ 'boobs', 'tits' ],
    provider: {
        id: 2757342,
        username: 'littlewilly123',
        url: '/users/littlewilly123'
    }
} */
```
</details>

## Get Pornstar Info
Accept both name and Url

```js
// pornhub.pornstar('Eva Elfie')
const result = await pornhub.pornstar('Eva Elfie')
console.log(result)
```

<details>
  <summary><b>Result</b></summary>

```js
/* {
  "name": "Eva Elfie",
  "verified": true,
  "background": "Russian",
  "birthPlace": "Russia",
  "careerStartAndEnd": "2018 to Present",
  "careerStatus": "Active",
  "cityAndCountry": "Moscow, RU",
  "ethnicity": "White",
  "eyeColor": "Green",
  ...
} */
```
*Note: unhandled property will be displayed like this:*

```js
// {
//   "Name In The Page": "The Value"
//   ...
// }
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/scrapers/page/pornstar.ts).
</details>

## Get Model Info
Accept both name and Url

```js
// pornhub.model('Eva Elfie')
const result = await pornhub.model('Luna Okko')
console.log(result)
```

<details>
  <summary><b>Result</b></summary>

```js
/* {
  "name": "Luna Okko",
  "verified": true,
  "tattoos": true,
  "gender": "Female",
  "ethnicity": "Asian",
  "hairColor": "Black",
  "interestedIn": "Guys and Girls",
  "relationship": "Taken",
  "socials": {
    "instagram": "https://www.instagram.com/lunaokko",
    "twitter": "https://www.twitter.com/lunaokko_",
  },
  ...
} */
```
*Note: unhandled property will be displayed like this:*

```js
// {
//   "Name In The Page": "The Value"
//   ...
// }
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/scrapers/page/model.ts).
</details>

# Search

### Response Structure
* Data - `data`
  * Would be different in each search type.
  * [searchVideo](#video-search)
  * [searchAlbum](#album-search)
  * [searchGif](#gif-search)
  * [searchPornstar](#pornstar-search)
* Pagination - `paging`
```js
const result = await pornhub.searchVideo(keyword, query)
console.log(result.paging)
// { current: 2, maxPage: 10, isEnd: false }
```
*\* Be careful*, the `paging.maxPage` is not **ACCURATE**.\
If you really need this, you can get it with `res.counting.total / 20` (divide the amount of video search results per page).


* Counting - `counting`
```js
const result = await pornhub.searchAlbum(keyword, query)
console.log(result.counting)
// showing 35-68 of total 220966 data records.
// { from: 35, to: 68, total: 220966 }
```

## Video Search

`pornhub.searchVideo(keyword, options?)`

<details>
  <summary><b>Options</b></summary>
All options are optional.

| Options     | Type      | Description                                                                             |
| ----------- | --------- | --------------------------------------------------------------------------------------- |
| page        | `int`     | Page number                                                                             |
| order       | `string`  | `"Most Relevant"` \| `"Most Recent"` \| `"Most Viewed"` \| `"Top Rated"` \| `"Longest"` |
| hd          | `boolean` | Show HD video only or not                                                               |
| production  | `string`  | `"all"` \| `"professional"` \| `"homemade"`                                             |
| durationMin | `int`     | `10` \| `20` \| `30`                                                                    |
| durationMax | `int`     | `10` \| `20` \| `30`                                                                    |
</details>

<details>
  <summary><b>Example</b></summary>

Warning: `data.hd` and `data.premium` has been **deprecated**.\
Currently pornhub will put premium video to another domain.\
And no more information about `hd`, so it wil always be `false`.

```js
const res = await pornhub.searchVideo('tokyo hot', {
    page: 2,
    production: 'professional',
    durationMin: 10,
    durationMax: 30
})
console.log(res.paging)
// { current: 2, maxPage: 10, isEnd: false }
console.log(res.counting)
// { from: 35, to: 68, total: 220966 }

res.data.forEach((item) => {
    console.log(item)
    /* {
        title: 'tokyo hot ep1',
        url: 'https://www.pornhub.com/view_video.php?viewkey=***',
        duration: '21:43',
        hd: true,
        premium: false,
        freePremium: false,
        preview: 'https://ci.phncdn.com/videos/***.jpg'
    } */
})
```
</details>

## Album Search

`pornhub.searchAlbum(keyword, options?)`

<details>
  <summary><b>Options</b></summary>

| Options  | Type                        | Description                                                                                                                            |
| -------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| page     | `int`                       | Show which page of search result                                                                                                       |
| order    | `string`                    | `"Most Relevant"` \| `"Most Recent"` \| `"Most Viewed"` \| `"Top Rated"`                                                               |
| verified | `boolean`                   | Show verified video                                                                                                                    |
| segments | `string` \| `Array<string>` | Default: &nbsp;`female-straight-uncategorized`<br>Options: `female`, `straight`, `male`, `gay`, `transgender`, `misc`, `uncategorized` |
</details>

<details>
  <summary><b>Example</b></summary>

```js
const res = await pornhub.searchAlbum('tokyo hot', {
    segments: ['female', 'straight']
})
console.log(res.paging)
// { current: 1, maxPage: 10, isEnd: false }
console.log(res.counting)
// { from: 1, to: 36, total: 899 }

res.data.forEach((item) => {
    console.log(item)
    /* {
        title: 'tokyo hot n0473',
        url: 'https://www.pornhub.com/album/***',
        rating: '100%',
        preview: 'https://ci.phncdn.com/***.jpg'
    } */
})
```
</details>

## GIF Search

`pornhub.searchGif(keyword, options?)`

<details>
  <summary><b>Options</b></summary>

| Options           | Type     | Description                                                              |
| ----------------- | -------- | ------------------------------------------------------------------------ |
| page              | `int`    | Show which page of search result                                         |
| order             | `string` | `"Most Relevant"` \| `"Most Recent"` \| `"Most Viewed"` \| `"Top Rated"` |
| sexualOrientation | `string` | `"straight` \| `"gay"` \| `"transgender"`                                |
</details>

<details>
  <summary><b>Example</b></summary>

```js
const res = await pornhub.searchGif('tokyo hot', {
    sexualOrientation: 'gay'
})
console.log(res.paging)
// { current: 1, maxPage: 10, isEnd: false }
console.log(res.counting)
// { from: 1, to: 34, total: 142017 }

res.data.forEach((item) => {
    console.log(item)
    /* {
        title: 'hot',
        url: 'https://www.pornhub.com/gif/14596972',
        mp4: 'https://cl.phncdn.com/pics/gifs/***.mp4',
        webm: 'https://cl.phncdn.com/pics/gifs/***.webm',
        preview: 'https://cl.phncdn.com/pics/gifs/***.jpg'
    } */
})
```
</details>

## PornStar Search

`pornhub.searchPornstar(keyword, options?)`

<details>
  <summary><b>Options</b></summary>

| Options | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| page    | `int`    | Show which page of search result                                             |
| order   | `string` | `"Most Relevant"` \| `"Most Popular"` \| `"Most Viewed"` \| `"No. of Video"` |
</details>

<details>
  <summary><b>Example</b></summary>

```js
const res = await pornhub.searchPornstar('kelly', {
    page: 1,
    order: 'Most Relevant'
})
console.log(res.paging)
// { current: 1, maxPage: 5, isEnd: false }
console.log(res.counting)
// { from: 1, to: 22, total: 93 }

res.data.forEach((item) => {
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
```
</details>

## Model Search

This method is a simple wrapper of [pornhub.autoComplete](#autocomplete) method, which cherry-pick the `models` field.

`pornhub.searchModel(keyword, options?)`

<details>
  <summary><b>Options</b></summary>

| Options           | Type     | Description                                |
| ----------------- | -------- | ------------------------------------------ |
| token             | `string` | (Optional) Token from `pornhub.getToken()` |
| sexualOrientation | `string` | `"straight` \| `"gay"` \| `"transgender"`  |
</details>


<details>
  <summary><b>Example</b></summary>

```js
const models = await pornhub.searchModel('luna')
console.log(models)
/* [{
  name:"Luna Okko",
  slug:"luna-okko",
  url: 'https://www.pornhub.com/model/luna-okko',
  rank:0
},{
  name:"lunaalessandra",
  slug:"lunaalessandra",
  url: 'https://www.pornhub.com/model/lunaalessandra',
  rank:1
},{
  name:"Luna Roulette",
  slug:"luna-roulette",
  url: 'https://www.pornhub.com/model/luna-roulette',
  rank:2
},
  ...
] */
```
</details>

# AutoComplete
Pornhub has an autocomplete API that can be used to get suggestions for search queries.\
This API is used by the search bar on the website.

`pornhub.autoComplete(keyword, options?)`

<details>
  <summary><b>Options</b></summary>

| Options           | Type     | Description                                |
| ----------------- | -------- | ------------------------------------------ |
| token             | `string` | (Optional) Token from `pornhub.getToken()` |
| sexualOrientation | `string` | `"straight` \| `"gay"` \| `"transgender"`  |
</details>

<details>
  <summary><b>Example</b></summary>

```js
const res = await pornhub.autoComplete('luna')
console.log(res)
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/types/AutoComplete.ts).
</details>

# Get Token
This method is used to get the token for pornhub's internal api.

(optional) You can cache this token to avoid frequent requests.\
I'm not sure about the expiration time though.

For now, this token is only used for [autoComplete](#autocomplete) and [searchModel](#searchmodel).
This library will automatically get token if you don't provide it.\

```js
const token = await pornhub.getToken()
```

# Login / Logout
You can login to gain access to **premium video**. (if you own a premium account)
```js
const result = await pornhub.login(account, password)
if (!result.success) {
    // Invalid username or password
    console.log(result.error)
}

/* do something after login */

// pornhub.logout()
```

# Custom Agent (Proxy)
You can set custom `agent` to achieve something like `Proxy`.\
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

# Route
Check [Route](./Route.md) for more information.
