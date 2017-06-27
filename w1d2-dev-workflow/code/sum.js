/*
Given that input some numbers from the command line
I want to sum them all
so that I can know the result
*/

function definitelyANumber(maybeNumber) {
  return !isNaN(maybeNumber);
}

function getNumbers(rawNumbers) {
  var numbers = [];
  for (var number of rawNumbers) {
    if (definitelyANumber(number)) {
      numbers.push(Number(number));
    }
  }
  return numbers;
}

function sumNumbers(numbers) {
  var total = 0;
  for (var i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

var args = process.argv.slice(2);
var result = sumNumbers(getNumbers(args));
console.log(result);

// Test code
if (sumNumbers([1, 10, 100]) === 111) console.log("It works!");
