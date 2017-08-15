const pg = require('pg')
const musicdb = require('./musicdb')

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
};

// Instantiate a new client
// If there's no config object,
// the client will read connection information from
// the same environment variables used by postgres cli tools.
const db = new pg.Client(config);

db.connect((err, connection) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  musicdb.findArtist(db, process.argv[2], (err, result) => {
    console.error(err)
    console.log(result)
  })

  musicdb.findTracksByArtist(db, process.argv[2], (err, result) => {
    console.error(err)
    console.log(result)
  })

  setTimeout(() => {db.end()}, 2000) // We need to wait queries to be done
                                     // before closing the connection.
                                     // I *promise* there's a better way to
                                     // do this! ;)
})
