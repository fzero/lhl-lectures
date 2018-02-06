// This module returns a function that receives the database connection
// inside the `client` argument
module.exports = function(client) {

  // The `client` argument is available in here, since arguments become a
  // local variable.

  // Now we define the values and functions we want to return from the modules
  const version = '1.0.very.alpha'

  function all(callback) {
    const query = "SELECT * from albums;";
    client.query(query, callback); // Notice we can use `client` just fine here
  }

  function findByName(name, callback) {
    const query = "SELECT * from albums WHERE name = $1;";
    client.query(query, [name], callback);
  }

  // Albums need more data to be created, so we'll receive an object
  const create = function(data, callback) {
    const query = "INSERT INTO albums (title, year, artist_id) VALUES($1, $2, $3)";
    client.query(query, [data.title, data.year, data.artist_id], callback);
  }

  // The return value of the function becomes the return value of the module.

  return {
    all: all,
    findByName: findByName,
    create: create,
    version: version
  }

}
