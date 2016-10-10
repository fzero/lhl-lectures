var request = require('request');

// Makes an un-authenticated request to github
function githubRequest(endpoint, callback) {
  var githubRoot = "https://api.github.com";

  // Github requests require a user agent
  var options = {
    url: `${githubRoot}${endpoint}`,
    headers: {
      'User-Agent': 'request'
    }
  };

  // Just pass the callback down to request
  request.get(options, callback);
}


// Here we're using githubRequest to get followers to a user
function getGithubFollowers(username, callback) {
  // Again we're passing the callback function down
  githubRequest(`/users/${username}/followers`, callback);
}


// Getting the party started!

var githubUsername = process.argv[2]; // Get username from CLI

console.log(`Getting ${githubUsername} followers...\n`);

getGithubFollowers(githubUsername, function(error, response, body) {
  if (error) {
    console.log("Something went wrong:", error);
    return;
  }

  var followers = JSON.parse(body);

  console.log(`${followers.length} followers:\n`);

  followers.forEach(function(follower){
    console.log(`- ${follower.avatar_url}`);
  });
});
