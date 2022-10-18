# Route

> API builder for pornhub.com

***Warning: This is an internal API, which may be changed at any time.***

This API can be used to build most of the [pornhub.com](https://www.pornhub.com) URLs.\
The purpose of exposing this is to allow users to utilize low level apis to build something more complex.

This document will only cover page related URLs (which is more stable). Please check the source code or type information for more information.

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
