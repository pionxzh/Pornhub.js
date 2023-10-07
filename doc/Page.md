# Page Parser

You can use this to parse a page and extract the information you need.

- [Page Parser](#page-parser)
  - [Get Video Info](#get-video-info)
  - [Get Album Info](#get-album-info)
  - [Get Photo Info](#get-photo-info)
  - [Get Pornstar Info](#get-pornstar-info)
  - [Get Model Info](#get-model-info)
  - [Get Random Video](#get-random-video)
  - [Get Video List](#get-video-list)
  - [Get Pornstar List](#get-pornstar-list)
  - [Get Recommended Videos](#get-recommended-videos)

## Get Video Info
Accept both ID and page URL

```js
// https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d
const video = await pornhub.video('ph5ac81eabe203d')
console.log(video)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Video ID or page URL |

<details>
  <summary><b>Result</b></summary>

```json5
{
  "id": "phxxxxx",
  "url": "https://www.pornhub.com/view_video.php?viewkey=phxxxxx",
  "title": "Susie sheep fucks peppa pig",
  "views": 49517,
  "voteUp": 352,
  "voteDown": 125,
  "percent": "74%",
  "provider": {
    "username": "TheFortniteVirginTheFortniteVirgin",
    "url": "/users/thefortnitevirgin"
  },
  "premium": false,
  "thumb": "data:image/gif;...",
  "preview": "https://di.phncdn.com/videos/...",
  "tags": ["hardcore", "hentai", "memes"],
  "categories": ["HD-Porn", "SFW"],
  "pornstars": [],
  "mediaDefinitions": [
    {
      "defaultQuality": true,
      "format": "hls",
      "quality": 720,
      "videoUrl": "https://cv.phncdn.com/videos/.../720P_1500K_.m3u8?validfrom=...&validto=...&rate=...&burst=...&ip=...&ipa=...&hash=..."
    },
    {
      "defaultQuality": false,
      "format": "hls",
      "quality": [1080, 720, 480, 240],
      "videoUrl": "https://cv.phncdn.com/videos/.../480P_600K_.m3u8?validfrom=...&validto=...&rate=...&burst=...&ip=...&ipa=...&hash=..."
    },
    {
      "defaultQuality": false,
      "format": "hls",
      "quality": 240,
      "videoUrl": "https://cv.phncdn.com/videos/.../240P_400K_.m3u8?validfrom=...&validto=...&rate=...&burst=...&ip=...&ipa=...&hash=...",
      "remote": true
    }
  ]
}
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
| ~~videos~~ (*deprecated*) | `Array`         | List of the videos. Sorted by quality(low->hight).                                                                         |
| mediaDefinitions  | `Array<object>` | List of the media information. Mostly m3u8 related.                                                                                |
| tags              | `Array<string>` | example: `['couple', 'kissing']`                                                                                                   |
| pornstars         | `Array<string>` | example: `['Bob', 'John', 'Emily]`                                                                                                 |
| categories        | `Array<string>` | example: `['HD-Porn', 'Small-Tits']`                                                                                               |
</details>

## Get Album Info
Accept both ID and page URL

```js
// https://www.pornhub.com/album/367633
const album = await pornhub.album('367633')
console.log(album)
```

<details>
  <summary><b>Result</b></summary>

```json5
{
  "photos": [{
    "url": "https://www.pornhub.com/photo/3683964",
    "views": "2.9K",
    "rating": "96%",
    "preview": "***.jpg"
  }, {
    "url": "https://www.pornhub.com/photo/3683965",
    "views": "3.5K"
    // ...
  }],
  "tags": ["boobs", "tits"],
  "provider": {
    "id": 2757342,
    "username": "littlewilly123",
    "url": "/users/littlewilly123"
  }
}
```
</details>

## Get Photo Info
Accept both ID and page URL

```js
// pornhub.photo('3683968')
const photo = await pornhub.photo('https://www.pornhub.com/photo/3683968')
console.log(photo)
```

<details>
  <summary><b>Result</b></summary>

```json5
{
  "info": {
    "title": "My HOT sister ;)",
    "views": 6170,
    "rating": "94%",
    "albumID": 367633,
    "url": "***.jpg"
  },
  "tags": ["boobs", "tits"],
  "provider": {
    "id": 2757342,
    "username": "littlewilly123",
    "url": "/users/littlewilly123"
  }
}
```
</details>

## Get Pornstar Info
Accept both name and page URL

```js
// pornhub.pornstar('Eva Elfie')
const result = await pornhub.pornstar('https://www.pornhub.com/pornstar/eva-elfie')
console.log(result)
```

<details>
  <summary><b>Result</b></summary>

```json5
{
  "name": "Eva Elfie",
  "verified": true,
  "background": "Russian",
  "birthPlace": "Russia",
  "careerStartAndEnd": "2018 to Present",
  "careerStatus": "Active",
  "cityAndCountry": "Moscow, RU",
  "ethnicity": "White",
  "eyeColor": "Green"
  // ...
}
```
*Note: unhandled property will be displayed like this:*

```json5
{
  "Name In The Page": "The String Value"
  // ...
}
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/scrapers/page/pornstar.ts).
</details>

## Get Model Info
Accept both name and page URL

```js
// pornhub.model('Luna Okko')
const result = await pornhub.model('https://www.pornhub.com/model/luna-okko')
console.log(result)
```

<details>
  <summary><b>Result</b></summary>

```json5
{
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
    "twitter": "https://www.twitter.com/lunaokko_"
  }
  // ...
}
```
*Note: unhandled property will be displayed like this:*

```json5
{
  "Name In The Page": "The String Value"
  // ...
}
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/scrapers/page/model.ts).
</details>

## Get Random Video

Get a random video from pornhub

```js
const video = await pornhub.randomVideo()
console.log(video)
```

Result is the same as [Get Video Info](#get-video-info)

## Get Video List

Get a list of videos from pornhub

Response type is the same as [Get Video Info](./Search.md#video-search)

```js
const videos = await pornhub.videoList(options)
console.log(videos)
```

<details>
  <summary><b>Options</b></summary>

| Options | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| page           | `int`     | Page number                                                                                            |
| order          | `string`  | `"Featured Recently"` \| `"Most Viewed"` \| `"Top Rated"` \| `"Hottest"` \| `"Longest"` \| `"Newest"`                |
| hd             | `boolean` | Show HD video only or not                                                                              |
| production     | `string`  | `"all"` \| `"professional"` \| `"homemade"`                                                            |
| durationMin    | `int`     | `10` \| `20` \| `30`                                                                                   |
| durationMax    | `int`     | `10` \| `20` \| `30`                                                                                   |
| filterCategory | `int`     | Category ID. You will see the list on the [Pornhub Category](https://www.pornhub.com/categories) page. |
| period         | `string`  | `"daily"` \| `"weekly"` \| `"monthly"` \| `"yearly"` \| `"alltime"`                                    |
| country        | `string`  | Only available when `order` is `"Hottest"`. `"Argentina"` \| `"Australia"` \| ... \| `"World"`                                                     |
| sexualOrientation | `string` | `"straight` \| `"gay"` \| `"transgender"`                                |
</details>

<details>
  <summary><b>Example</b></summary>

Warning: `data.hd` and `data.premium` has been **deprecated**.\
Currently pornhub will put premium video to another domain.\
And no more information about `hd`, so it wil always be `false`.

```js
const res = await pornhub.videoList({
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

## Get Pornstar List

Get a list of pornstars from pornhub

```js
const pornstars = await pornhub.pornstarList(options)
console.log(pornstars)
```

<details>
  <summary><b>Options</b></summary>

| Options | Type     | Description                                                                  |
| ------- | -------- | ---------------------------------------------------------------------------- |
| performerType    | `string` | `"pornstar"` \| `"amateur"` Default will be both pornstar and model |
| gender | `string` | `"male"` \| `"female"` \| `"m2f"` \| `"f2m"` |
| ethnicity | `string` | `"asian"` \| `"black"` \| `"indian"` \| `"latin"` \| `"middle eastern"` \| `"mixed"` \| `"white"` \| `"other"` |
| tattoos | `boolean` | Has tattoos or not |
| cup | `string` | `"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"F-Z"` |
| piercings | `boolean` | Has piercings or not |
| hair | `string` | `"auburn"` \| `"bald"` \| `"black"` \| `"blonde"` \| `"brown"` \| `"brunette"` \| `"gray"` \| `"red"` \| `"various"` \| `"other"` |
| breastType | `string` | `"natural"` \| `"fake"` |
| ageFrom | `int` | (`18`) \| `20` \| `30` \| `40` |
| ageTo | `int` | `20` \| `30` \| `40` \| (`99`) |
| page    | `int`    | Show which page of search result |
| order   | `string` | `"Most Popular"` \| `"Most Viewed"` \| `"Top Trending"` \| `"Most Subscribed"` \| `"Alphabetical"` \| `"No. of Videos"` \| `"Random"` |
| letter | `string` | (only when `order` = `"Alphabetical"`)<br>`"A"` to `"Z"`. `"num"` for number |
| timeRange | `string` | (only when `order` = `"Most Popular"`)<br>`"weekly"` \| `"monthly"` \| `"yearly"` |
| timeRange | `string` | (only when `order` = `"Most Viewed"`)<br>`"daily"` \| `"weekly"` \| `"monthly"` \| `"alltime"` |
</details>

<details>
  <summary><b>Example</b></summary>

```js
const res = await pornhub.pornstarList({
    page: 1,
    gender: 'female',
    order: 'No. of Videos',
})
console.log(res.paging)
// { current: 1, maxPage: 5, isEnd: false }

res.data.forEach((item) => {
    console.log(item)
    /* {
      name: 'maria1099',
      url: 'https://www.pornhub.com/model/maria1099',
      views: '43M',
      videoNum: 13948,
      rank: 7286,
      photo: 'https://ci.phncdn.com/pics/pornstars/default/female.jpg'
      verified: true,
      awarded: false
    } */
})
```
</details>

## Get Recommended Videos

Get a list of recommended videos from pornhub

```js
const videos = await pornhub.recommendedVideos(options)
console.log(videos)
```

<details>
  <summary><b>Options</b></summary>

| Options           | Type     | Description                          |
| ----------------- | -------- | ------------------------------------ |
| order             | `string` | `"Most Relevant"` \| `"Most Recent"` |
| page              | `int`    | Show which page of result            |
| sexualOrientation | `string` | `"straight` \| `"gay"`               |
</details>

<details>
  <summary><b>Example</b></summary>

```js
const res = await pornhub.recommendedVideos({
    order: 'Most Recent',
    page: 3,
})
console.log(res.paging)
// { current: 2, maxPage: 10, isEnd: false }

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
