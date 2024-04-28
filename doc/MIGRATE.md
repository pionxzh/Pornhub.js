# Motivation

This package was poorly written and maintained. And the code structure was not good. So I decided to rewrite it with a better structure and more features.

Here are some of the biggest changes:
* Rewrite with **TypeScript**
  * You can be benefited from the auto-completion in IDE
* Distribute both **ESM** and **CommonJS**
  * You can use it with both `import` and `require`
* Update the code to follow changes from PornHub

# Migration

## Preparations

PornHub.js V1 requires at least Node.js 14, so make sure you upgrade your Node.js if you're still running an older one.

## Changes
* Remove unnecessary response structure
  * All page-related API
    ```js
    const result = await pornhub.video(url)
    console.log(result)
    ```
  * Before
    ```json5
    {
      "vID": "phxxxxx",
      "status": "200",
      "data": {
        "title": "Japanese Tokyo Hot"
        // ...other information
      }
    }
    ```
  * After
    ```json5
    {
      "id": "phxxxxx",
      "title": "Japanese Tokyo Hot"
      // ...other information
    }
    ```
* `pornhub.search(type, keyword)` has been removed
  * Use the following methods instead
    * `pornhub.searchVideo(keyword, options?)`
    * `pornhub.searchModel(keyword, options?)`
    * `pornhub.searchPornstar(keyword, options?)`
    * `pornhub.searchGif(keyword, options?)`
    * `pornhub.searchAlbum(keyword, options?)`
    * See [Search](/doc/Search.md) for more details
* `pornhub.on(type, callback)` has been removed
  * I really don't know why I added this in the first place...
  * Before
  ```js
  pornhub.on('loggedIn', () => {
      /* do something after login */
  })

  pornhub.login(account, password)
  ```
  * After
  ```js
  const result = await pornhub.login(account, password)
  if (!result.success) {
      // Invalid username or password
      console.log(result.error)
  }
  ```

## Features Added

* Support `Pornstar` and `Model` Page
  ```js
  // pornhub.pornstar('Eva Elfie')
  const result = await pornhub.pornstar('https://www.pornhub.com/pornstar/eva-elfie')
  console.log(result)

  // pornhub.model('Luna Okko')
  const result = await pornhub.model('https://www.pornhub.com/model/luna-okko')
  console.log(result)
  ```
* Support searching for `Model`
  ```js
  const result = await pornhub.searchModel('Luna Okko')
  console.log(result)
  ```
* Support [AutoComplete](/doc/Search.md#autocomplete) API
  ```js
  const result = await pornhub.autoComplete('keyword')
  console.log(result)
  ```
* Expose some internal / low-level methods for advanced user
  * [getToken()](/doc/DOCUMENT.md#get-token)
  * [Route](/doc/DOCUMENT.md#route)
