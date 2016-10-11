// Playing with requests using ES6 syntax
const request = require('request');
const URL = "http://google.com";

request.get(URL, (err, response, body) => {
  console.log(`Size: ${body.length}\n\n`);
});
