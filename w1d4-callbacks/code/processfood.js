// First our high-order function
function processFood(foodItem, callback) {
  callback(foodItem);
}

// Now our callbacks (or function arguments)
function slice(foodItem) {
  console.log("Your " + foodItem + " is now sliced!");
}

function grate(foodItem) {
  console.log("Your " + foodItem + " is now grated!");
}

function blend(foodItem) {
  console.log("Your " + foodItem + " is now blended! Mmmm... smoothie!");
}

// And now we use it
processFood("carrot", grate);
processFood("carrot", slice);
processFood("kale", blend);
