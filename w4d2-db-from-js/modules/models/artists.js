// This module returns a function that receives the database connection
// inside the `client` argument
module.exports = function(client) {

  // The `client` argument is available in here, since arguments become a
  // local variable.

  // Now we define the values and functions we want to return from the modules
  const version = '1.0.very.alpha'

  const all = function(callback) {
    const query = "SELECT * from artists;";
    client.query(query, callback); // Notice we can use `client` just fine here
  }

  const findByName = function(name, callback) {
    const query = "SELECT * from artists WHERE name = $1;";
    client.query(query, [name], callback);
  }

  const create = function(name, callback) {
    const query = "INSERT INTO artists (name) VALUES($1)";
    client.query(query, [name], callback);
  }

  // The return value of the function becomes the return value of the module.
  // The returned functions will remember the value of `client` that was
  // received at the top! This is called a closure.
  // More info about closures here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
  //
  // Also: we're using object shorthand here; you can do this whenenever
  // the keys and values have the same name. This is the same as:
  //
  // return {
  //   all: all,
  //   findByName: findByName,
  //   ...
  // }

  return {
    all,
    findByName,
    create,
    version
  }

}
