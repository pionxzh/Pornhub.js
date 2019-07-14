# WebMaster (Hubtraffic API)

- [WebMaster (Hubtraffic API)](#WebMaster-Hubtraffic-API)
  - [Search Video](#Search-Video)
    - [Available options](#Available-options)
  - [Get Video Info](#Get-Video-Info)
  - [Is Video Active](#Is-Video-Active)
  - [Get Embed Code](#Get-Embed-Code)
  - [Get Deleted Videos](#Get-Deleted-Videos)
  - [Get Tag List](#Get-Tag-List)
  - [Get Category List](#Get-Category-List)
  - [Get Pornstar List](#Get-Pornstar-List)
  - [Get Pornstar Detail List](#Get-Pornstar-Detail-List)

## Search Video
```js
pornhub.webMaster.search(keyword, options?)
```

### Available options
| Name      | Type            | Description                                                                            |
| --------- | --------------- | -------------------------------------------------------------------------------------- |
| page      | `number`        | page                                                                                   |
| tags      | `Array<string>` | tags                                                                                   |
| category  | `Array<string>` | category name list                                                                     |
| stars     | `Array<string>` | pornstars                                                                              |
| ordering  | `enum`          | featured    \| newest    \| mostviewed \| rating                                       |
| period    | `enum`          | weekly      \| monthly   \| alltime                                                    |
| thumbsize | `enum`          | small       \| medium    \| large                \| small_hd  \| medium_hd \| large_hd |

```js
const options = {
    page: 2,
    category: ['teen'],
    ordering: 'newest',
    thumbsize: 'medium'
}
pornhub.webMaster.search('peppa pig', options).then(data => {
    console.log(data)
    // array of video infos( same as the getVideo() )
})
```

## Get Video Info

```js
pornhub.webMaster.getVideo(url)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Page url or video ID |

```js
// https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d
pornhub.webMaster.getVideo('ph5ac81eabe203d').then(data => {
    console.log(data)
    /* {
        url: 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d',
        title: 'Susie sheep fucks peppa pig',
        views: 50065,
        duration: '0:44',
        thumb: 'https://ci.phncdn.com/videos/201804/07/161102592/original/(m=eaf8Ggaaaa)(mh=mDMLboeH6vZKEuOI)12.jpg',
        thumbList: [{
            width: '320',
            height: '240',
            src: '***.jpg'
        }, {
            ...
        }, ...
        ],
        publishDate: '2018-10-02 00:10:05',
        vote: {
            up: 360,
            down: 130,
            total: 490,
            rating: 73.47
        },
        tags: ['anal', 'peppa-pig', 'hardcore', 'hentai', ...]
        pornstars: [],
        categories: ['sfw', 'step-fantasy']
    } */
})
```

## Is Video Active

```js
pornhub.webMaster.isVideoActive(url)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Page url or video ID |

```js
pornhub.webMaster.isVideoActive('ph5ac81eabe203d').then(isActive => {
    console.log(isActive)
    // true
})
```

## Get Embed Code

```js
pornhub.webMaster.getVideoEmbedCode(url)
```

| Params | Type     | Description          |
| ------ | -------- | -------------------- |
| url    | `string` | Page url or video ID |

```js
const url = 'https://www.pornhub.com/view_video.php?viewkey=ph5ac81eabe203d'
pornhub.webMaster.getVideoEmbedCode(url).then(code => {
    console.log(code)
    /* <iframe src="https://www.pornhub.com/embed/ph5ac81eabe203d" frameborder="0" width="560" height="340" scrolling="no" allowfullscreen></iframe> */
})
```

## Get Deleted Videos

```js
pornhub.webMaster.getDeletedVideos(page)
```

| Params | Type  | Description |
| ------ | ----- | ----------- |
| page   | `int` | Page number |

```js
pornhub.webMaster.getDeletedVideos(2).then(videos => {
    console.log(videos)
    /* [
        { vkey: 'ph5d205e434de05', deleted_on: '2019-07-06 09:51:33' },
        { vkey: 'ph5d0501cb3281f', deleted_on: '2019-07-06 09:51:20' },
        { vkey: 'ph5d206b34c91a6', deleted_on: '2019-07-06 09:51:13' },
        { vkey: 'ph5d097e477d23a', deleted_on: '2019-07-06 09:50:04' },
        ...
    ] */
})
```

## Get Tag List

**※This API is very heavy**, please store the result locally if you need the data.

```js
pornhub.webMaster.getTags(letter)
```

| Params | Type     | Description                                        |
| ------ | -------- | -------------------------------------------------- |
| letter | `string` | a-z, `a` \| `b` \| `c` \| `d` \| `e` \| ... \| `z` |

```js
pornhub.webMaster.getTags('z').then(data => {
    console.log(data)
    /* [
        'z',
        'z 1',
        'z 1 n',
        'z a',
        'z a d d y',
        'z alexis',
        'z alice',
        'z amber',
        'z black',
        ...
    ] */
})
```

## Get Category List

```js
pornhub.webMaster.getCategories()
```

```js
pornhub.webMaster.getCategories().then(categories => {
    console.log(categories)
    /* [
        { id: '1', category: 'asian' },
        { id: '2', category: 'orgy' },
        { id: '3', category: 'amateur' },
        { id: '4', category: 'big-ass' },
        { id: '5', category: 'babe' },
        { id: '6', category: 'bbw' },
        ...
    ] */
})
```

## Get Pornstar List

```js
pornhub.webMaster.getPornstars()
```

```js
pornhub.webMaster.getPornstars().then(pornstars => {
    console.log(pornstars)
    /*
    [
        '2 Pretty 4 Porn',
        '4play',
        'Aali Kali',
        'Aaliyah Brown',
        'Aaliyah Grey',
        'Aaliyah Hadid',
        'Aaliyah Jolie',
        'Aaliyah Love',
        'Aaliyah Taylor',
        ...
    ]
    */
})
```

## Get Pornstar Detail List

**※This API is very heavy (18K+ records)**, please store the result locally if you need the data.

```js
pornhub.webMaster.getPornstarsDetail()
```

```js
pornhub.webMaster.getPornstarsDetail().then(pornstars => {
    console.log(pornstars)
    /*
    [{
        star_name: '2 Pretty 4 Porn',
        star_thumb: '***.thumb_1256231.jpg',
        star_url: 'https://www.pornhub.com/pornstar/videos_overview?pornstar=2-pretty-4-porn',
        gender: 'female',
        videos_count_all: '71'
    }, {
        star_name: '4play',
        star_thumb: '***.thumb_1025141.jpg',
        star_url: 'https://www.pornhub.com/pornstar/videos_overview?pornstar=4play',
        gender: 'male',
        videos_count_all: '43'
    },
        ...
    ]
    */
})
```
