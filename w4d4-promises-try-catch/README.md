# Errors and Promises

The name of this lecture sounds like a whiny album by a shoegazer band from
the 90s, but we're actually still talking about Javascript.

## "Traditional" error handling

* `try` / `catch` and control flow with errors
* Works fine with synchronous code, breaks horribly with async. [MDN has extensive documentation on it.](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/try...catch)

Clearly we need something better, because dealing with errors in async code
usually means you need to deal with them inside callbacks. We've seen plenty of
examples in previous lectures:

```
db.query(query, [artistName, albumName], (err, result) => {
  if (err) {
    console.log("Something went wrong:", err);
    return;
  }
  // Do something with `result` here
}
```

This is ok, but we can do better!

## Promises to the rescue

Promises provide a way to make async code less painful. Many async-heavy
libraries support them natively, but it's important to know how to use them from
scratch using the `Promise` constructor. Again, [MDN has extensive
docs](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise),
but [this article by Dave Atchley has better
examples](http://www.datchley.name/es6-promises/).

The main idea goes like this:

* Functions **don't** return values, but an instance of `Promise` (also known as a _future_)
  * Think of it as an IOU for the function's return value
* When things go well: `.then((something) => {something()})`
  * `.then` is called with the **sucessful** return value of the previous step
* You can add more `.then`s here, as long as you return another promise
  * You can make immediately resolved/rejected promises with `Promise.resolve("value")`
  * So instead of `return "value"` you'll use `return Promise.resolve("value")`
* When errors happen: `.catch((oops) => console.log("Things went boom, yo"))`
  * The chain will be halted and `.catch` will be called immediately with the error as first argument

[This site provides an amazing visualization of how promises work](http://bevacqua.github.io/promisees/), including examples on how to use `Promise.all()` to run several promises in parallel and use their results.

See [`promises.js`](code/promises.js) for an introductory example and
[`p-request.js`](code/p-request.js) for a practical use of promises being used
with the `request` module.

For a more complete example, check out [`getheadtags.js`](code/getheadtags.js).
It uses promises to break each one of the process' steps into a
promise-compatible function, the calls everything step by step at the end.
