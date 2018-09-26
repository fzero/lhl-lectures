// A quick example function that takes two arrays and makes an object,
// where one array contains keys and the other values.

// Our keys array
var keys = [
  'banana',
  'apple',
  'orange',
  'pear',
  'lime'
]

// Our values array
var values = [
  'yellow and delicious',
  "as long as it's not red delicious, fine",
  'is the new black',
  {taste: 'good', cocktails: 'maybe?'},
  'margarita time!'
]

// Our function
var zip = function(keys, values) {
  var result = {}                          // Starts by creating an empty object
  for(var i = 0; i < keys.length; i++) {   // Iterates over keys, using the same
    console.log('Current key:', keys[i])   // index for values
    console.log('Current value:', values[i])
    result[keys[i]] = values[i]            // Put it all together
  }
  return result                            // Return result
}

console.log(
  zip(keys, values)
)
