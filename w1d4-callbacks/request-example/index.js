// Example of callbacks used in asynchronous code
// We'll talk more about this in future lectures

var request = require('request'); // Loads the request package to pull data off the internet

console.log("--- This is the very first thing in my program.");

// Callback function to be used by request. We need to provide three arguments.
// For more details, see https://www.npmjs.com/package/request
function printSize(error, response, body) {
  console.log("This page is " + body.length + " bytes long.");
}

// Request will get the pages off the internet then *call our function back*
// (hence the name) once data arrives!
request.get("https://en.wikipedia.org/wiki/Kitten", printSize);
request.get("https://google.com", printSize);
request.get("https://netflix.com", printSize);

console.log("--- This is the very last thing in my program.");
