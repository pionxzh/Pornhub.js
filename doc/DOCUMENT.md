# Document

- [Document](#document)
- [Login / Logout](#login--logout)
- [Custom Agent (Proxy)](#custom-agent-proxy)
- [Page Parser](#page-parser)
- [Search](#search)
- [Get Token](#get-token)
- [Route](#route)

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
You can set a custom `agent` to achieve something like `Proxy`.\
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

# Page Parser
Check [Page Parser](./Page.md) for more information.

# Search
Check [Search](./Search.md) for more information.

# Get Token
This method is used to get the token for pornhub's internal API.

For now, this token is only used for [autoComplete](./Search.md#autocomplete) and [searchModel](./Search.md#model-search).\
This library will automatically get the token if you don't provide one.

*(optional)* You can cache this token to avoid frequent requests.\
I'm not sure about the expiration time though.

```js
const token = await pornhub.getToken()
// provide the token manually
const result = await pornhub.autoComplete('luna', { token })
```

# Route
You can use `Route` to build the URL of any pages on [pornhub.com](https://www.pornhub.com).

Check [Route](./Route.md) for more information.
