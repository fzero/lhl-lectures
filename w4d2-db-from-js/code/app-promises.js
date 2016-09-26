const pg = require('pg-then');

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
client.query('SELECT * FROM artists;')
.then((result) => {
  console.log(`Number of results: ${result.rowCount}\n`);
  result.rows.forEach((row) => {
    let output = [];
    for (column in row) {
      output.push(`${column}: ${row[column]}`);
    }
    console.log(output.join(', '));
  })
})
.then(() => client.end())
.catch((err) => {
  console.log("Something went wrong!", err);
});
