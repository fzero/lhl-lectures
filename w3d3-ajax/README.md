# Client-side Javascript: AJAX!

> The code discussed in class can be found inside [`/code`](code).

Today we discussed how we can use AJAX to fetch data from the server _asynchronously_ in the browser. This technology allows us to sync and change the state of our app **without refreshing the page**.

The technology was originally create by Microsoft (yup). It is actually called `XMLHttpRequest` but it's an awful name so everyone calls it AJAX instead. [Check out Wikipedia if you don't believe me!](https://en.wikipedia.org/wiki/Ajax_(programming))

XHR calls aren't very straightforward to make...
```js
function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();
```

...so to make our lives easier we will be using the jQuery library to make AJAX easier.

## jQuery AJAX

Here is how to do a [jQuery AJAX](http://api.jquery.com/jQuery.ajax/) call:
```js
$.ajax('http://localhost:5000/breweries')
.done((response) => {
  console.log(response)
})
.fail(() => {
  console.err('The call failed')
})
```

A bonus is that the response from the server is automatically turned into JS objects and you don't have to manually convert `response` via `JSON.parse()`.

When dealing with AJAX requests there exists a min of 3 outcomes:

* The call was successful (happy path)
* The call was successfully BUT the request failed (i.e. The server responded that you didn't something you weren't supposed to do.)
* The call failed (for example the internet went down)

Also you can use the `jQuery.get()`, `jQuery.getJSON()`, `jQuery.post()` calls, but they are just helper functions that call `jQuery.ajax` behind the scenes.

## What about `fetch()`?

Newer versions of Javascript implement a new native way of making AJAX requests that's heavily influenced by jQuery. Here's what it looks like:

```js
// url (required), options (optional)
fetch('https://myjsonapi.com/some/url', {method: 'get'})
.then(function(response) {
  // Everything went right!
})
.catch(function(err) {
	// Error :(
});
```

[Not all browser support `fetch()` at this moment](http://caniuse.com/#search=fetch), so for now we're stuck using jQuery or a [`fetch()` polyfill](https://github.com/github/fetch). See [this article](https://davidwalsh.name/fetch) for more details.

## Bonus: JSONPlaceholder

It's and amazing tool to test your AJAX requests with fake data. [Check it out](http://jsonplaceholder.typicode.com) and thank Faisal for the tip!

---
Lecture notes adapted from Rob Jackiewicz - thanks!
