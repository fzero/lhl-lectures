const fs = require('fs')
const readline = require('readline')

// Make a random number between 0 and max
const rand = (max) => {
  return Math.round(Math.random() * max)
}


// Make a random string
const makeRandomString = (size = 6) => {
  const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  output = ''
  for (let i = 0; i < size; i++) {
    output += allowedChars[rand(allowedChars.length - 1)]
  }
  return output
}


// Get a new url for a shortCode, then write to disk
const getNewUrl = () => {
  const shortCode = makeRandomString()

  const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
  })

  rl.question(
    `New URL for ${shortCode}: `,
    (newUrl) => {
      urlDatabase[shortCode] = newUrl
      rl.close()
    }
  )

  rl.on('close', gracefulShutdown)
}


// Graceful shutdown
const gracefulShutdown = ()  => {
  console.log('\nWriting data to disk and shutting down gracefully...')
  const contents = JSON.stringify(urlDatabase)
  fs.writeFileSync('./data.json', contents)
  process.exit()
}

// Handling outside interruptions
process.on('SIGTERM', gracefulShutdown) // listen for TERM signal .e.g. kill
process.on('SIGINT', gracefulShutdown) // listen for INT signal e.g. Ctrl-C


/*
  App start
*/

// Reat current URL db from disk
const contents = fs.readFileSync('./data.json')
const urlDatabase = JSON.parse(contents)
console.log('--- Server booted! Recovered data:\n', urlDatabase, '\n---\n')

const command = process.argv[2]
if (!command) console.log('Run `npm start addurl` to add a new URL.')

// If user types `npm start addurl`, ask for a new URL.
if (command === 'addurl') {
  getNewUrl()
}
