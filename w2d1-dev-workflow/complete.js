/*
Write a node script that ...

1. √ Receives unlimited arguments from the command line
2. √ If they're numbers
3.   √ Sum them up
4. √ Output the result to the console
*/

function convert_values(values) {
  var numbers = [];

  for(var value of values) {
    var number = Number(value)
    if (!isNaN(number)) {
      numbers.push(number)
    }
  }
  return numbers;
}


function sum(values) {
  var total = 0;
  var numbers = convert_values(values);

  for(var number of numbers) {
    total += number;
  }

  return total;
}


var arguments = process.argv.slice(2)
console.log(`The sum of the numbers is ${sum(arguments)}.`)
