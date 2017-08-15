const pg = require('pg')
const musicdb = require('./musicdb-promises')

// Create a config to configure both pooling behavior
// and client options.
// Note: all config is optional and the environment variables
// will be read if the config is not present
// You can put this data on a .env file if you'd like.
const config = {
  user: 'fzero', //env var: PGUSER
  database: 'week4', //env var: PGDATABASE
  password: undefined, //env var: PGPASSWORD
  port: 5432 //env var: PGPORT
}

// Instantiate a new client
// If there's no config object,
// the client will read connection information from
// the same environment variables used by postgres cli tools.
const db = new pg.Client(config)

db.connect((err, connection) => {
  if (err) {
    console.error('Connection error:', err) // Deal with error politely
    process.exit(1)                         // Exit app politely
  }

  // Promises FTW!
  musicdb.findArtist(db, process.argv[2])
  .then((result) => {
    for (let row of result.rows) {
      console.log(`Artist: ${row.name}`)
    }
  })
  .then(() => musicdb.findTracksByArtist(db, process.argv[2]))
  .then((result) => {
    for(let row of result.rows) {
      console.log(`Album: ${row.album} - Track: ${row.title}`)
    }
  })
  .then(() => db.end()) // Close connection after everything's done!
  .catch((error) => {
    console.error('AAAAARGH!!!!', error)
    db.end()
  })
})
