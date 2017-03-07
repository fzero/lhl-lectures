// Example 3: context is not scope
// Functions have access to the object that calls the function, accessible
// through the `this` keyword.
// Simple function calls will always have this = global, while functions
// called within objects will have this = the caller object


function description() {
  console.log(this.name + " is an agent with license " + this.licence + ", codename: " + this.codename);
}

var james = {
  name: "James Bond",
  licence: "To kill",
  codename: "007",
  describe: description // Notice we're passing the function as a value, NOT calling it!
}

var clark = {
  name: "Clark Kent",
  licence: "To fly",
  codename: "Superman",
  describe: description
}

james.describe(); // this = james
clark.describe(); // this = clark
description(); // this = global, so everything will be `undefined`
