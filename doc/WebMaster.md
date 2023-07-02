# WebMaster (Hubtraffic API)

[Webmaster](https://www.pornhub.com/webmasters) is the API for [Hubtraffic](https://www.hubtraffic.com), the traffic tracking system for Pornhub. It allows you to get information about the traffic on your videos and your channel.

If this API can meet your needs, please use this instead of the parser API. The parser API will be affected by the changes on the PornHub website.

- [WebMaster (Hubtraffic API)](#webmaster-hubtraffic-api)
  - [Search Video](#search-video)
  - [Get Video Info](#get-video-info)
  - [Is Video Active](#is-video-active)
  - [Get Embed Code](#get-embed-code)
  - [Get Deleted Videos](#get-deleted-videos)
  - [Get Tag List](#get-tag-list)
  - [Get Category List](#get-category-list)
  - [Get Pornstar List](#get-pornstar-list)
  - [Get Pornstar Detail List](#get-pornstar-detail-list)

## Search Video
`pornhub.webMaster.search(keyword, options?)`

<details>
  <summary><b>Options</b></summary>

| Name      | Type            | Description                                                                            |
| --------- | --------------- | -------------------------------------------------------------------------------------- |
| page      | `number`        | page                                                                                   |
| tags      | `Array<string>` | tags                                                                                   |
| category  | `Array<string>` | category name list                                                                     |
| stars     | `Array<string>` | pornstars                                                                              |
| ordering  | `enum`          | featured    \| newest    \| mostviewed \| rating                                       |
| period    | `enum`          | weekly      \| monthly   \| alltime                                                    |
| thumbsize | `enum`          | small       \| medium    \| large                \| small_hd  \| medium_hd \| large_hd |
</details>

<details>
  <summary><b>Example</b></summary>

```js
const result = await pornhub.webMaster.search('peppa pig', {
    page: 2,
    category: ['teen'],
    ordering: 'newest',
    thumbsize: 'medium'
})
console.log(result)
// array of video infos( same as the getVideo() )
```
</details>

## Get Video Info

```js
pornhub.webMaster.getVideo(url)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Page url or video ID |

<details>
  <summary><b>Result</b></summary>

```js
// https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d
const result = await pornhub.webMaster.getVideo('ph5ac81eabe203d')
console.log(result)
```

```json5
{
  "url": "https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d",
  "title": "Susie sheep fucks peppa pig",
  "views": 50065,
  "duration": "0:44",
  "thumb": "https://ci.phncdn.com/videos/201804/07/161102592/original/(m=eaf8Ggaaaa)(mh=mDMLboeH6vZKEuOI)12.jpg",
  "thumbList": [{
    "width": "320",
    "height": "240",
    "src": "***.jpg"
  }
  // ...
  ],
  "publishDate": "2018-10-02 00:10:05",
  "vote": {
    "up": 360,
    "down": 130,
    "total": 490,
    "rating": 73.47
  },
  "tags": ["anal", "peppa-pig", "hardcore", "hentai"],
  "pornstars": [],
  "categories": ["sfw", "step-fantasy"]
}
```
</details>

## Is Video Active

```js
pornhub.webMaster.isVideoActive(url)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Page url or video ID |

<details>
  <summary><b>Result</b></summary>

```js
const isActive = await pornhub.webMaster.isVideoActive('ph5ac81eabe203d')
console.log(isActive) // true
```
</details>

## Get Embed Code

```js
pornhub.webMaster.getVideoEmbedCode(url)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Page url or video ID |

```js
const code = await pornhub.webMaster.getVideoEmbedCode('ph5ac81eabe203d')
console.log(code)
/* <iframe src="https://www.pornhub.com/embed/ph5ac81eabe203d" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe> */
```
</details>

## Get Deleted Videos

```js
pornhub.webMaster.getDeletedVideos(page)
```

| Params | Type  | Description |
| ------ | ----- | ----------- |
| page   | `int` | Page number |

<details>
  <summary><b>Result</b></summary>

```js
const videos = await pornhub.webMaster.getDeletedVideos(2)
console.log(videos)
```

```json5
[
  { "vkey": "ph5d205e434de05", "deleted_on": "2019-07-06 09:51:33" },
  { "vkey": "ph5d0501cb3281f", "deleted_on": "2019-07-06 09:51:20" },
  { "vkey": "ph5d206b34c91a6", "deleted_on": "2019-07-06 09:51:13" },
  { "vkey": "ph5d097e477d23a", "deleted_on": "2019-07-06 09:50:04" }
  // ...
]
```
</details>

## Get Tag List

**※This API is very heavy**, please cache the result locally.

```js
pornhub.webMaster.getTags(letter)
```

| Params | Type     | Description                                        |
| ------ | -------- | -------------------------------------------------- |
| letter | `string` | a-z, `a` \| `b` \| `c` \| `d` \| ... \| `z` |

<details>
  <summary><b>Result</b></summary>

```js
const result = await pornhub.webMaster.getTags('z')
console.log(result)
```

```json5
[
  "z",
  "z 1",
  "z 1 n",
  "z a",
  "z a d d y",
  "z alexis",
  "z alice",
  "z amber",
  "z black"
  // ...
]
```
</details>

## Get Category List

```js
pornhub.webMaster.getCategories()
```

※ The official API is inconsistent with the type of returned `id`. Sometimes it's all numbers, sometimes it's all strings.

<details>
  <summary><b>Result</b></summary>

```js
const categories = await pornhub.webMaster.getCategories()
console.log(categories)
```

```json5
[
  { "id": 1, "category": "asian" },
  { "id": 2, "category": "orgy" },
  { "id": 3, "category": "amateur" },
  { "id": 4, "category": "big-ass" },
  { "id": 5, "category": "babe" },
  { "id": 6, "category": "bbw" }
  // ...
]
```
</details>

## Get Pornstar List

```js
pornhub.webMaster.getPornstars()
```

<details>
  <summary><b>Result</b></summary>

```js
const pornstars = await pornhub.webMaster.getPornstars()
console.log(pornstars)
```

```json5
[
  "2 Pretty 4 Porn",
  "4play",
  "Aali Kali",
  "Aaliyah Brown",
  "Aaliyah Grey",
  "Aaliyah Hadid",
  "Aaliyah Jolie",
  "Aaliyah Love",
  "Aaliyah Taylor"
  // ...
]
```
</details>

## Get Pornstar Detail List

**※This API is very heavy (20K+ records)**, please cache the result locally.

```js
pornhub.webMaster.getPornstarsDetail()
```

<details>
  <summary><b>Result</b></summary>

```js
const pornstars = await pornhub.webMaster.getPornstarsDetail()
console.log(pornstars)
```

```json5
[{
  "star_name": "2 Pretty 4 Porn",
  "star_thumb": "***.thumb_1256231.jpg",
  "star_url": "https://www.pornhub.com/pornstar/videos_overview?pornstar=2-pretty-4-porn",
  "gender": "female",
  "videos_count_all": "71"
}, {
  "star_name": "4play",
  "star_thumb": "***.thumb_1025141.jpg",
  "star_url": "https://www.pornhub.com/pornstar/videos_overview?pornstar=4play",
  "gender": "male",
  "videos_count_all": "43"
}
  // ...
]
```
</details>
