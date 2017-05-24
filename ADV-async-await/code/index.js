const request = require('request')

// Get URL from command line or use Wikipedia
const url = process.argv[2] || "https://en.wikipedia.org/wiki/Main_Page"


// Simple callback version
function getPageSize(url, cb) {
  request.get(url, (err, res, body) => {
    if (err) {
      console.error(`Something went wrong: ${err}`)
      return
    }
    cb(body.length)
  })
}


// Promisified version
function getPageSizeP(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        reject(`Something went wrong: ${err}`)
        return
      }
      resolve(body.length)
    })
  })
}


// Now we use the promisified version to do it with async/await
// Note that we're using try/catch to deal with errors. The funcion is marked
// as async, so rejected promises will trigger the catch block.
async function getPageSizeAA(url) {
  try {
    // This is the same as getPageSizeP(url).then((size) => {...})
    // In other words, Javascript waits for the result and assigns it to
    // size if the promise resolves.
    const size = await getPageSizeP(url)
    console.log(`Async/Await: ${url} is ${size / 1024} Kb in size.`)
  }
  catch(err) { // catches both errors and rejected promises
    console.error(err)
  }
}


// Callback
getPageSize(url, (size) => console.log(`Callback: ${url} is ${size / 1024} Kb in size.`))

// Promise
getPageSizeP(url)
.then((size) => console.log(`Promise: ${url} is ${size / 1024} Kb in size.`))
.catch((err) => console.error(err))

// Async/await
getPageSizeAA(url)
