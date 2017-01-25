# Client-side Javascript: AJAX!

Today we discussed how we can use AJAX to fetch data from the server _asynchronously_ in the browser. This technology allows us to sync and change the state of our app **without refreshing the page**.

The technology was originally create by Microsoft (yup). It is actually called `XMLHttpRequest` but it's an awful name so everyone calls it AJAX instead. [Check out Wikipedia if you don't believe me!](https://en.wikipedia.org/wiki/Ajax_(programming))

For this week to make our lives easier we will be using the jQuery library to make AJAX easier instead of the native way of creating `xhr` requests.

## jQuery AJAX

Here is how to do a jQuery AJAX call:
```js
$.ajax('http://localhost:5000/breweries')
.done((response) => {
  console.log(response)
})
.fail(() => {
  console.err('The call failed')
})
```

A bonus is that the response from the server is automatically turned into JS objects and you don't have to manually convert the `responseBody` via `JSON.parse()``

When dealing with AJAX requests there exists a min of 3 outcomes:

* The call was successfull (happy path)
* The call was successfully BUT the request failed (i.e. The server responded that you didn't something you weren't supposed to do.)
* The call failed (for example the internet went down)

Also you can use the `jQuery.get()`, `jQuery.getJSON()`, `jQuery.post()` calls, but they are just helper functions that call `jQuery.ajax` behind the scenes.

---
Lecture notes adapted from Rob Jackiewicz - thanks!
