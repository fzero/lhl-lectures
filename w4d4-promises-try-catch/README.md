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

## Promises to the rescue

Promises provide a way to make async code less painful. Many async-heady libraries support them natively (`request` for example), but it's important to know how to use them from scratch using the `Promise` constructor. Again, [MDN has extensive docs](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise), but [this article by Dave Atchley has better examples](http://www.datchley.name/es6-promises/).

The main idea goes like this:

* Something something code code code
* When things go well: `.then((something) => {something()})`
  * `.then` is called with the **sucessful** return value of the previous step
* You can add more `.then`s here, as many as you want
* When errors happen: `.catch((oops) => console.log("Things went boom, yo"))`
  * The chain will be halted and `.catch` will be called immediately with the error as first argument
