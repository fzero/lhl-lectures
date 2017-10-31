/*
Given that I have some numbers √
I want to sum them all √
so that I can know the result √
*/

function cleanNumbers(dirtyNumbers) {
  var result = [];
  for (var dirtyNumber of dirtyNumbers) {
    var cleanNumber = Number(dirtyNumber)
    if (!isNaN(cleanNumber)) {
      result.push(cleanNumber);
    }
  }
  return result;
}

function sumNumbers(cleanNumbers) {
  var total = 0;
  for (var i = 0; i < cleanNumbers.length; i += 1) {
    total += cleanNumbers[i];
  }
  return total;
}

var numbers = cleanNumbers(process.argv.slice(2));
var total = sumNumbers(numbers);
console.log('The result is', total);
