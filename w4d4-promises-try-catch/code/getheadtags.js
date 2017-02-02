const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const url = process.argv[2]
const tagsFile = process.argv[3]

// We need two parameters
if (!url || !tagsFile) {
  console.log("Usage: node getheadtags.js <url> <file>")
  process.exit(1)
}

// Promisified request.get()
// Returns a promise:
// - resolves with body
// - rejects with error
function pGet(url) {
  // The function returns a promise object, not a value
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      if (err) {
        // When something goes wrong, we call reject(), which
        // will trigger the catch() call in your promise.
        // It's usually a good idea to return too, so we'll
        // do both things at once.
        return reject(err)
      }
      // If nothing fails, we call resolve().
      // This triggers the next then() call. You should
      // pass the return value inside.
      resolve(body)
    })
  })
}


// Yes, I can mix promises with try/catch, but only if the section
// where I'm using try/catch is synchronous (no callbacks).
// This function works exacly like the one above.
function tryGet(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res, body) => {
      try {
        if (err) throw(err)
        return resolve(body)
      }
      catch(err) {
        return reject(err)
      }
    })
  })
}


// The next two functions display information about the body returned
// a successful pGet() call. They return immediately resolved promises
// with the original body to keep the .then() chain going.

function displayBodySize(body) {
  console.log(`${url} is ${body.length} bytes long.\n`)
  return Promise.resolve(body)
}

function displayContents(body) {
  console.log(body)
  return Promise.resolve(body)
}


// Now we'll use cheerio to get some information from the
// URL and write it to a file later.
// Using try-catch to catch any cheerio errors!
function extractHeaderTags(body) {
  try {
    let tags = []
    let $ = cheerio.load(body)
    $('h1, h2, h3, h4').each(function(i, elem) {
      tags.push( $(this).text().trim() )
    })
    return Promise.resolve(tags)
  }
  catch(err) {
    return Promise.reject(err)
  }
}


// And here we'll do more asynchronous stuff. Promises FTW!
function writeTagsTextToFile(tags, filename) {
  return new Promise((resolve, reject) => {
    let lines = [`Text from <h1>, <h2>, <h3> and <h4> tags found in ${url}:\n`]
    for (let tag of tags) {
      lines.push(`* ${tag}`)
    }
    lines.push("\n") // extra blank line at the end
    let fileContents = lines.join("\n")

    fs.writeFile(filename, fileContents, (err) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(fileContents)
      }
    })
  })
}


pGet(url)
.then(displayBodySize) // We can do this when a function receives a single argument
.then(extractHeaderTags)
.then((tags) => writeTagsTextToFile(tags, tagsFile))
.then((fileContents) => console.log(`Wrote header tags to ${tagsFile}:\n\n${fileContents}`))
.catch((err) => console.error(`Something went wrong! Error: ${err}`))
