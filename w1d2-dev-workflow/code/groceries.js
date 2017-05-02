/*
Given that I have a grocery list
I want to go to the grocery store
To buy some groceries
*/

// Note how we define all functions before we use them.
// This is considered a good practice in Javascript.

// Go to a location
function goTo(location) {
  // TODO: this whole thing
  console.log("We're going to", location);
}

// Grab a thing
function grab(thing) {
  console.log("Got", thing);
}

// Check if item is available at the grovery store
function lookForItem(item) {
  var availableItems = [
    "Coffee",
    "Beer",
    "Eggs",
    "Chives",
    "Garlic",
    "Green Tomatoes",
    "Basil",
    "Whole wheat farfalle",
    "Shampoo"
  ];

  var foundIndex = availableItems.indexOf(item);
  if (foundIndex > -1) {
    return item;
  }
}


////////////////////
// The code only starts actually executing below!
////////////////////

// My shopping list
var groceries = [
  "Coffee",
  "Bread",
  "Eggs",
  "Onions",
  "Garlic",
  "Tomatoes",
  "Basil",
  "Whole wheat fusilli",
  "Shampoo"
];

var groceryStoreLocation = {lat:43.6467123, lng:-79.3951956};
goTo(groceryStoreLocation);

var shoppingCart = [];
grab(shoppingCart);

for (var index = 0; index < groceries.length; index++) {
  var found = lookForItem(groceries[index]);
  if (found) {
    shoppingCart.push(found);
  }
}

console.log("Found the following items:", shoppingCart.join(', '));
