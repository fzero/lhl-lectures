# Using APIs

* What is an API anyway?
* Figuring out what you need
  * Authentication (keys, tokens etc.)
  * Endpoints
  * How to send/receive data
    * JSON
  * Example: [Github API](https://developer.github.com/v3)

**NOTE:** Some Github API endpoints may require an authentication token. You'll know when you hit one if you get an error message telling you how to do it. There are a few ways to make an HTTP request passing in the token, but the easiest one using `request` looks like this:

```javascript
function requestWithToken(url, callback) {
  var requestData = {
    url: url,
    auth: {
      bearer: 'YOUR TOKEN HERE'
    },
    headers: {
      'User-Agent': 'request'
    }
  };

  request.get(requestData, callback); // The actual request. When the data is ready, `callback` is called.
}
```
