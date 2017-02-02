// an immediately resolved promise
var immediate = Promise.resolve("foo");

// can get it after the fact, unlike events
immediate.then((res) => console.log(res));

var p = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("Everything is GOOD!"), 2000);
});

p.then((res) => {
  console.log("First then:", res);
  return Promise.resolve("This will be sent to the next step");
})
.then((res) => {
  console.log("Second then:", res);
  return Promise.resolve("And this to the next...");
})
.then((res) => {
  console.log("Third then:", res);
})

console.log("This isn't inside a promise!");
