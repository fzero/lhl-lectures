const pg = require('pg');

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
const client = new pg.Client(config);

// We pass the client down to our modules.
// We only need to connect to the database once, after all!
const artists = require('./models/artists')(client)
const albums = require('./models/albums')(client)

// connect to our database
client.connect((err) => {
  if (err) {
    return console.log('Something went wrong:', err)
  }

  // Using the function defined inside the artists module.
  artists.findByName(process.argv[2], (err, result) => {
    if (err) {
      return console.log('Something went wrong:', err)
    }

    const rows = result.rows;
    console.log(rows);
    client.end(); // Closes the connection and exits the app
  });

});
