const request = require('request')

// Does a single GET request and returns a promise
const req = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        return reject(err)
      }
      return resolve(body)
    })
  })
}

// Doing multiple requests in parallel using Promise.all
// All requests run at the same time.
const parallelGet = (urls) => {
  // We start by putting all requests into an array
  // Note that we're actually calling req() here!
  // This is the moment when all requests are initiated
  const requests = urls.map(url => req(url))
  Promise.all(requests)
    // The `results` argument below is an array containing all resolved
    // promises in the same order as they were created above.
    // .then() is only called when all promises resolve.
    .then(results => results.map(body => console.log(body.length)))
    // If ANY of the promises is rejected, we go to .catch()
    .catch(error => console.error('Stuff exploded:', error))
}

const urls = [
  'https://en.wikipedia.org/wiki/Kitten',
  'https://github.com/fzero/lhl-lectures/tree/master/ADV-async-await',
  'https://githhub.com/fzero/lhl-lectures/tree/master/w4d4-promises-try-catch',
  'https://www.npmjs.com/package/request'
]
parallelGet(urls)


// Here we're coming full circle using async/await
// Any function marked as `async` returns a promise by default.
// You can now use `await` to tell JS to wait for a promise to resolve.
// try/catch is promise-aware inside async functions:
// you can use it to deal with rejected promises in a more idiomatic way.
(async () => {
  try {
    // Awaits promise to call .resolve() - this is the same as:
    // req(...).then((result) => console.log(result.length))
    const result = await req('https://en.wikipedia.org/wiki/Kitten')
    console.log(result.length)   // Everything here
    console.log("All is fine!")  // is running synchronously
    console.log("A third step!") // now!
  }
  // In case of .reject(), the catch() block can deal with it!
  // This is the same as:
  // req(...).catch((error) => console.error('Something exploded:', error))
  catch (error) {
    console.error('Something exploded:', error)
  }
})()
