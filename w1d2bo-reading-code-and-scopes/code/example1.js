// Example 1: code isn't necessarily executed in order
// Function definitions are just that: definitions.
// The code only runs when the function is called

// Global variable x
var x = 0;

console.log('A: ', x);

function a(x) { // This is NOT the same x - this one is local to function a
  console.log('B: ', x)

  x++;

  console.log('C: ', x)
}

console.log('D: ', x);

a(1000); // function a only runs here!

console.log('E: ', x);
