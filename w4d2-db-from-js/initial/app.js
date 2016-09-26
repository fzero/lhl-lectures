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

// connect to our database
client.connect((err) => {
  if (err) throw err;

  client.query('SELECT * FROM artists;', (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
