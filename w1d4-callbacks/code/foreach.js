/*
Given I have an array
I want to run a function on each of its items
So I can save time
*/

var numbers = [1,2,3,4,5];

// function forEach() {}
// and
// var forEach = function() {}
// are equivalent
var forEach = function(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}

// Just give it console.log to print stuff to the screen
forEach(numbers, console.log);

// Do some math and print items to the screen with their indexes
forEach(numbers, function(n, index) {
  var result = n * (n - 1);
  console.log(result, index);
});

// Print n dashes to the screen
forEach(numbers, function(n) {
  var dashes = '';
  for (var i = 0; i < n; i++) {
    dashes += '-';
  }
  console.log(dashes);
});


// Now some functions to use as callbacks

// Prints the type of the item
function getType(item) {
  console.log(item + ' is a ' + typeof(item));
}

forEach(numbers, getType);

// Multiplies the item by 2
function multiplyBy2(item) {
  console.log(item * 2);
}

forEach(numbers, multiplyBy2);
