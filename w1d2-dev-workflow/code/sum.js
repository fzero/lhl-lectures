/*
Given that I have some numbers
I want to sum them all
so that I can know the result

We already know:
- How to get arguments from the command line
- How to sum numbers
- How to go through all of them
*/


// Small function to figure out if a number is actually a number.
// This is just to avoid that double negative - is not not a number
function actuallyNumber(value) {
  return !isNaN(value);
}


// The function only works with the given arguments. This is
// a good practice that should be followed whenever possible.
// Avoid referencing global variables inside your functions!
function totalize(numbers) {
  var total = 0;
  for (var counter = 0; counter < numbers.length; counter++) {
    var number = Number(numbers[counter]);
    if (actuallyNumber(number)) {
      total += number;
    }
    // This also works, but it's harder to read.
    // total += actuallyNumber(number) ? number : 0;
  }
  return total;
}


var numbers = process.argv.slice(2);
console.log('The total is ' + totalize(numbers));

// The line below is also valid, but I don't like having
// so many braces together.
// console.log('The total is ' + totalize(process.argv.slice(2)));
