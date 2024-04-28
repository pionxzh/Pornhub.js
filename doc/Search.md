# Search

`Pornhub.js` allows you to search for the following:
- [Search](#search)
    - [Response Structure](#response-structure)
  - [Video Search](#video-search)
  - [Album Search](#album-search)
  - [GIF Search](#gif-search)
  - [PornStar Search](#pornstar-search)
  - [Model Search](#model-search)
- [AutoComplete](#autocomplete)

And you can also get various suggestions with [AutoComplete](#autocomplete).

### Response Structure
* Data - `data`
  * Data holder of the response.
  * Would be different in each search type.
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

| Options        | Type      | Description                                                                                            |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| page           | `int`     | Page number                                                                                            |
| order          | `string`  | `"Most Relevant"` \| `"Most Recent"` \| `"Most Viewed"` \| `"Top Rated"` \| `"Longest"`                |
| hd             | `boolean` | Show HD video only or not                                                                              |
| production     | `string`  | `"all"` \| `"professional"` \| `"homemade"`                                                            |
| durationMin    | `int`     | `10` \| `20` \| `30`                                                                                   |
| durationMax    | `int`     | `10` \| `20` \| `30`                                                                                   |
| filterCategory | `int`     | Category ID. You will see the list on the [Pornhub Category](https://www.pornhub.com/categories) page. |
| period         | `string`  | `"daily"` \| `"weekly"` \| `"monthly"` \| `"yearly"` \| `"alltime"`                                    |
| sexualOrientation | `string` | `"straight` \| `"gay"`               |
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
        id: 'phxxxxx',
        url: 'https://www.pornhub.com/view_video.php?viewkey=phxxxxx',
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

| Options           | Type     | Description                                                                  |
| ----------------- | -------- | ---------------------------------------------------------------------------- |
| page              | `int`    | Show which page of search result                                             |
| order             | `string` | `"Most Relevant"` \| `"Most Popular"` \| `"Most Viewed"` \| `"No. of Video"` |
| sexualOrientation | `string` | `"straight` \| `"gay"`                                                       |
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

Model searching is tricky.\
Currently, there is no official way to search models on pornhub. So we have to use the `autocomplete` API to simulate the search.

This method is a simple wrapper of [pornhub.autoComplete()](#autocomplete) method, which cherry-pick the `models` field.

It will return a list of simple model objects.
You need to find the model you want in the list, and then use `pornhub.model(url)` to get the detailed model information.

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

const model = await pornhub.model(models[0].name)
console.log(model)
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

```json5
{
  "queries": [
    "Tokyo Motion",
    "Tokyo Lynn",
    "Tokyo",
    "Tokyo Leigh"
    // ...
  ],
  "albums": [
    "Tokyo",
    "Japan Tokyo",
    "Tokyo Ghoul Hentai",
    "Japanese Tokyo Hot"
    // ...
  ],
  "models": [
    {
      "slug": "tokyolovestory",
      "name": "tokyolovestory",
      "rank": 0,
      "url": "https://www.pornhub.com/model/tokyolovestory"
    }
    // ...
  ],
  "pornstars": [
    {
      "slug": "tokyo-lynn",
      "name": "Tokyo Lynn",
      "rank": 1315,
      "url": "https://www.pornhub.com/pornstar/tokyo-lynn"
    }
    // ...
  ],
  "channels": [
    {
      "slug": "tokyobikinicollege",
      "name": "Tokyo Bikini College",
      "rank": "1539",
      "url": "https://www.pornhub.com/channels/tokyobikinicollege"
    }
    // ...
  ],
  "isDdBannedWord": "false",
  "popularSearches": [
    "aerith",
    "lady dimitrescu",
    "japanese 無修正",
    "ada wong",
    "stella cox"
    // ...
  ]
}
```

\> Check the type definition [here](https://github.com/pionxzh/Pornhub.js/blob/master/src/types/AutoComplete.ts).
</details>
