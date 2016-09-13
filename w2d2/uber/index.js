// Here we're using Uber's REST API to get some data.
// See the full docs at https://developer.uber.com/docs/rides
// Note how:
// - GETs always retrieve data, while other HTTP verbs change or update data
// - Every action is grouped by category (a.k.a. resource)
//   - /products, /estimates/time, /estimates/price...
//
// We're only doing GET requests below, but if we wanted to hail a ride, we
// would do a POST (i.e. CREATE a new ride)!

const request = require('request')

// Creating an Uber request function to make our lives easier
function uberRequest(endpoint, callback) {
  const SERVER_TOKEN = "YOUR SERVER TOKEN HERE"
  const BASE_URL = "https://api.uber.com/v1"
  // See Uber API docs: https://developer.uber.com/docs/rides/authentication#api-token-authentication
  // Every request needs to include an authorization header to work.
  let requestData = {
    url: `${BASE_URL}${endpoint}`,
    headers: {
      'Authorization': `Token ${SERVER_TOKEN}`
    }
  }

  request.get(requestData, callback)
}


function uberProducts(latitude, longitude, callback) {
  uberRequest(`/products?latitude=${latitude}&longitude=${longitude}`, callback)
}


function uberTimeEstimates(latitude, longitude, callback) {
  uberRequest(`/estimates/time?start_latitude=${latitude}&start_longitude=${longitude}`, callback)
}


// List Uber products for King/Spadina
uberProducts(43.645413, -79.395085, (err, response, body) => {
  let data = JSON.parse(body)
  console.log("Uber products for King/Spadina:\n")
  data.products.forEach((product) => {
    console.log(`${product.display_name}: ${product.description}`)
  })
  // Add blank lines for better display...
  console.log("\n");
})


// Get time estimates for the same location
uberTimeEstimates(43.645413, -79.395085, (err, response, body) => {
  let data = JSON.parse(body)
  console.log("Time estimates for King/Spadina:\n")
  data.times.forEach((time) => {
    console.log(`${time.localized_display_name}: ${time.estimate} seconds`)
  })
  // Add blank lines for better display...
  console.log("\n");
})
