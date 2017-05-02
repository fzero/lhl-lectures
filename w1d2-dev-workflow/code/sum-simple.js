/*
Given that I have some numbers
I want to sum them all
so that I can know the result
*/

var numbers = process.argv.slice(2);
var total = 0;

// We're using a different kind of for loop here.
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
for (var number of numbers) {
  var realNumber = Number(number);
  if (isNaN(realNumber)) {
    continue;
  }
  total += Number(number);
}

console.log("The total is", total);
