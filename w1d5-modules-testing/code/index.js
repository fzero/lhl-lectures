// Require a package installed with npm
var request = require("request");

// Require the math module and put the exported
// object inside the variable math
var math = require("./math");

// Now we can use it!
console.log(`4 squared is ${math.squared(4)}.`);
console.log(`The area of a 2 meter circle is ${math.circleArea(2, 5)} sq. meters.`);
console.log(`The circumference of a 4 meter circle is ${math.circumference(4, 5)} meters.`);

// Using request to calculate the size in kilobytes of a particular URL
// bytes -> kbytes conversion courtesy of ou math module!
var url = "http://www.nytimes.com";
request.get(url, function(err, res, body) {
  console.log(`${url} is ${math.toKb(body.length)} kbytes long.`);
});
