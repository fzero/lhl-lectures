var request = require('request');

// Get request
request.get("http://httpbin.org/get", function(error, response, body) {
  // If we have an error, we need to deal with it.
  if (error) {
    console.log("Boom! It asploded!");
    console.log(error);
    return;
  }

  console.log("\n\nDone with GET request!");

  // Once we JSON.parse the response, we have a regular JS object
  var data = JSON.parse(body);
  console.log("This is the origin:", data.origin);
  console.log("This is the Host header:", data.headers.Host);
});


// Now let's do a POST request. First let's cook up some data
var postData = {
  firstName: "Dwayne",
  lastName: "Johnson",
  nickName: "The Rock",
  rating: "Awesome"
};

// And now the request itself. Note the object we're sending: it has a `body`
// and and a `json` key. When json is true, request will automatically
// JSON.stringify the data for us. If we didn't have this parameter we'd have to
// do it manually.
request.post("http://httpbin.org/post", {body: postData, json: true}, function(error, response, body) {
  // If we have an error, we need to deal with it.
  if (error) {
    console.log("Boom! It asploded!");
    console.log(error);
    return;
  }

  console.log("\n\nDone with POST request!");

  // We should check the response status to see if everything went right
  // Remember HTTP response codes: 200 means ok.
  // You can (and maybe should!) put your response-handling code inside
  // a condition block like this.
  if (response.statusCode === 200) {
    console.log("Everything went fine! Here's the response body HTTPbin sent back:\n");

    // With the `json: true` parameter, request will also unpack the JSON
    // response body automatically.
    console.log(body);
  }
});
