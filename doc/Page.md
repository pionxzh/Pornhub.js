# Page Parser

`Pornhub.js` allows you to parse a page and get the information you need. This is useful if you want to build a bot that can search for videos, get information about a video, or anything else that can be done on the website.

- [Page Parser](#page-parser)
  - [Get Video Info](#get-video-info)
  - [Get Album Info](#get-album-info)
  - [Get Photo Info](#get-photo-info)
  - [Get Pornstar Info](#get-pornstar-info)
  - [Get Model Info](#get-model-info)

## Get Video Info
Accept both ID and page url

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

```json5
{
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
  "tags": ["hardcore", "hentai", "memes"],
  "categories": ["HD-Porn", "SFW"],
  "pornstars": [],
  "videos": [{
    "quality": "720",
    "filename": "720P_1500K_161102592.mp4",
    "extension": "mp4",
    "url": "..."
  }]
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
| videos            | `Array`         | List of the videos. Sorted by quality(low->hight).                                                                                 |
| tags              | `Array<string>` | example: `['couple', 'kissing']`                                                                                                   |
| pornstars         | `Array<string>` | example: `['Bob', 'John', 'Emily]`                                                                                                 |
| categories        | `Array<string>` | example: `['HD-Porn', 'Small-Tits']`                                                                                               |
</details>

## Get Album Info
Accept both ID and page url

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
Accept both ID and page url

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
Accept both name and page url

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
  "Name In The Page": "The Value"
  // ...
}
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/scrapers/page/pornstar.ts).
</details>

## Get Model Info
Accept both name and page url

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

```js
// {
//   "Name In The Page": "The Value"
//   ...
// }
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/scrapers/page/model.ts).
</details>
