/*
Given that I have some numbers
I want to sum them all
so that I can know the result

Things we need to do:
  - print messages to the screen [ok]
  - read command-line parameters [ok]
    - process.argv
  - sum numbers [ok]
*/

// Takes array and returns only elements that are numbers
function getNumbers(inputArgs) {
  var output = [];
  for (var i = 0; i < inputArgs.length; i += 1) {
    var converted = Number(inputArgs[i]);
    if ( !(isNaN(converted)) ) {
      output.push(converted);
    }
  }
  return output;
}

// Returns a sum of all numbers in an array
function sumNumbers(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  return total;
}

var numbers = getNumbers(process.argv.slice(2));
var result = sumNumbers(numbers);
console.log(result);
