var request = require('request');

// Helper function to do authenticated requests to the Github API
function githubRequest(endpoint, callback) {
  var requestData = {
    url: `https://api.github.com${endpoint}`,
    auth: {
      bearer: 'YOUR GITHUB TOKEN HERE'
    },
    headers: {
      'User-Agent': 'request' // Github requires a user agent header. You can put anything here.
    }
  };

  request.get(requestData, callback); // The actual request. When the data is ready, `callback` is called.
}
