var counter = 10;

function increaseCounter() {
  counter++;
}

for (var i = 0; i < 100; i += 10) {
  increaseCounter();
}

function report() {
  var counter;

  console.log("The final result is: ", counter);
}

console.log(counter);
report();
