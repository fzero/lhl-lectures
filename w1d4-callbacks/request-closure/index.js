// Loads request package
var request = require('request');

// Get a few URLs from the command line.
// Yes, we could simply put all these in an Array.
// Feel free to do it yourself! ;)
var url1 = process.argv[2];
var url2 = process.argv[3];

// This function takes an argument and returns *another function*
// that takes three arguments - exactly what request.get expects.
// Note that the url argument can be used within the returned function.
// That's the magic of closures!
var printUrlSize = function(url) {
  return function(error, response, body) {
    var sizeInKb = (body.length / 1024).toFixed(2);
    // `url` is coming from printUrlSize. It can be used here because the returned
    // function inherits the scope of the higher order function (i.e. all
    // variables defined before the return statement).
    console.log("==== Size of " + url + " in Kb: " + sizeInKb);
  }
}


// Code starts running HERE

console.log("---- This is at the TOP of my code.");

// These calls are *asynchronous*, so you'll only see their output
// after the requests are concluded!
request.get(url1, printUrlSize(url1));
request.get(url2, printUrlSize(url2));

console.log("---- This is at the BOTTOM of my code.");

