// Example 3: Global variables are available inside functions
// but local variables are only visible within the function.

var counter = 10;

function increaseCounter() {
  counter++;
}

for (var i = 0; i < 100; i += 10) {
  increaseCounter();
}

function report() {
  var counter; // From this point onwards, THIS is the counter the function has access to.

  console.log("The final result is: ", counter); // counter = undefined!
}

console.log(counter);
report();
