# Route

> API builder for pornhub.com

You can use `Route` to build the URL of any pages on [pornhub.com](https://www.pornhub.com).\
Exposing this allows users to utilize low-level APIs to build something more complex.

This document will only cover page-related URLs.\
Please check the [source code](https://github.com/pionxzh/Pornhub.js/blob/master/src/apis/route.ts) for more information.

# Page

## MainPage

```js
pornhub.route.mainPage()
// www.pornhub.com
```

## Video Page

```js
pornhub.route.videoPage(id)
// www.pornhub.com/view_video.php?viewkey={id}
```

## Album Page

```js
pornhub.route.albumPage(id)
// www.pornhub.com/album/{id}
```

## Photo Page

```js
pornhub.route.photoPage(id)
// www.pornhub.com/photo/{id}
```

## Pornstar Page

```js
pornhub.route.pornstarPage(name)
// www.pornhub.com/pornstar/{name}
```

## Model Page

```js
pornhub.route.modelPage(name)
// www.pornhub.com/model/{name}
```

## Channel Page

```js
pornhub.route.channelPage(name)
// www.pornhub.com/channels/{name}
```
