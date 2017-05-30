require('dotenv').load();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/db/migrations'
    },
    seeds: {
      directory: './server/db/seeds'
    }
  }
};
