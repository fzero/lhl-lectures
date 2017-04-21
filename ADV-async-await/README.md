# Async/Await - Making Javascript great again

Remember when we talked about [error handling and promises](../w4d4-promises-try-catch)? We've discussed several things, including how async code breaks native Javascript error handling. In other words, `try`/`catch` doesn't work properly when callbacks are involved.

[Promises introduce a better way to deal with that](http://www.datchley.name/es6-promises) using `.then()` and `.catch()`, and are an official part of ES6 Javascript.

The `async` and `await` kwyords bring it all full circle by making promises a natural part of Javascript - and bringing back `try`/`catch` support. You just have to mark a function as `async` to be able to use `await` inside it to wait for a promise (usually returned by a function call) to resolve.

If the promise is rejected inside a `try`/`catch` block, the `catch` statement will receive the return value. In other words, instead of writing an Express route that access a database like this:

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

## A full example: [Baaaes](https://github.com/fzero/baaaes)

I created an ExpressJS boilerplate to demonstrate how `async`/`await` can make dealing with databases in Node way less frustrating. The repo contains instructions and example code to make a complete application without dealing with insane callback chains.
