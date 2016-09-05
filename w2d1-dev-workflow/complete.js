/*
Write a node script that ...

Unlimted number of args
Consider them numbers
Sum them up
Output them to the console as a sentence
*/

// func defn
function sum(numbers) {
  var total = 0;
  // for(var i = 0; i < args.length; i++) {
  for(var num of numbers) {
    // var total = 0; // <- setting to zero everytime would not work, so it's a gotcha
    // console.log('i:', args[i]);
    num = Number(num);
    if(!isNaN(num)) {
      console.log('num:', num);
      total += num; // aka: total = total + args[i]
    }
  }
  return(total);
}

// We don't care for first 2 arguments
var args = process.argv.slice(2);

// func invoke / call
var result = sum(args); // => 12

// console.log('Result:', result);
console.log('Result:', result);
