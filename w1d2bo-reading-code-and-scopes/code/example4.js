// Example 4: context is not scope!
// Functions have access to the object that calls the function, which is
// accessible through the `this` keyword.
// Simple function calls will always have this = global, while functions
// called within objects will have this = the caller object.

// Notice how we're declaring this function. In essence, this is the same as
// function description(), but it makes clear that we're *always* putting
// a piece of code inside a variable.
var description = function() {
  console.log(this.name + " is an agent with licence " + this.licence + ", codename: " + this.codename);
}


var james = {
  name: "James Bond",
  licence: "To kill",
  codename: "007",
  describe: description // Notice we're passing the function as a value,
}                       // NOT calling it! Functions *only* run when you add
                        // parentheses.

var clark = {
  name: "Clark Kent",
  licence: "To fly",
  codename: "Superman",
  describe: description
}


james.describe(); // this = james
clark.describe(); // this = clark
description(); // this = global, so everything will be `undefined`
