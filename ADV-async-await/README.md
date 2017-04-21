# Async/Await - Making Javascript great again

Remember when we talked about [error handling and promises](../w4d4-promises-try-catch)? We've discussed several things, including how async code breaks native Javascript error handling. In other words, `try`/`catch` doesn't work properly when callbacks are involved.

[Promises introduce a better way to deal with that](http://www.datchley.name/es6-promises) using `.then()` and `.catch()`, and are now an official part of ES6 Javascript.

The `async` and `await` keywords bring it all full circle by making promises a natural part of Javascript and bringing back `try`/`catch` support. You just have to mark a function as `async` to use `await` inside. This tells Javascript that you're waiting for a promise to resolve.

If the promise is rejected inside a `try`/`catch` block, the `catch` statement will receive the return value. In other words, instead of writing code like this:

```js
router.get('/', (req, res) => {
  models.Product.findAll()
  .then((result) => {
    res.json(result)
  })
  .catch((error) => {
    res.status(400).json(error)
  })
})
```

You can write it like this:

```js
router.get('/', async (req, res) => {
  try {
    res.json(await models.Product.findAll())
  }
  catch(error) {
    res.status(400).json(error)
  }
})
```

There are some simple examples in the [`/code`](code) folder comparing the different async approaches. [This article](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8) also has a very good explanation of how promises and `async`/`await` are connected, including some pitfalls to avoid. A particularly insteresting one is the syntax for `Promise.all()`.

## A full example: [Baaaes](https://github.com/fzero/baaaes)

I created an ExpressJS boilerplate to demonstrate how `async`/`await` can make dealing with databases in Node _way_ less frustrating. The end result is more legible code, less nesting and absolutely no callback hell.
