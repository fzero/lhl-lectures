/*
Given that I have some numbers
I want to sum them all
so that I can know the result
*/

function sum(numbers) {
  var total = 0;

  for (var i = 0; i < numbers.length; i += 1) {
    var number = Number(numbers[i]);
    if (isNaN(number)) {
      continue;
    }
    total += Number(numbers[i]);
  }
  return total;
}

function getNumbers() {
  return process.argv.slice(2);
}

var numbers = getNumbers();
var total = sum(numbers);
console.log('The total is', total);

// Automated testing!

if (sum([10, 5, 2 ,3]) === 20) {
  console.log("The function works!");
}
else {
  console.log("You have a bug or you broke math.");
}
