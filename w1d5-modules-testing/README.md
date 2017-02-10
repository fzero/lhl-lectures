# Modules, packages and testing

Until this point we've been working with very simple and short programs, but that will change very soon. To avoid unnecessary complications, we'll need a way to divide our apps into different files in a logical way. That's what **modules** are for.

You can also create modules in a way that can be reused in different apps. These are called **packages**.

Node has thousands of packages providing ready-made modules for all kinds of purposes, which will save you **years** (literally!) of development hours. There are packages to do virtually anything!

## Before anything: `npm`

Node.js comes with a package manager / task runner called [npm](https://www.npmjs.com/). It uses a JSON file called `package.json` to describe your project and all packages necessary for it to work. [npm has extensive documentation](https://docs.npmjs.com/), but here's a quick cheatsheet:

* `npm init`
    * Creates a `package.json` file for your project by asking a few simple questions. **You should always start your project with this.**
* `npm install --save <package>`
    * Installs a package and adds it to your `package.json` file
* `npm install --save-dev <package>`
    * Same thing, but install the package as a development dependency on `package.json`. Use this for linters, testers, compilers, builders and anything else that won't be needed for the app to run in production, but will be useful during development.
* `npm install -g <package>`
    * Installs a package globally and makes command-line utilities available.
    * Example: `npm install -g express-generator` and then you can use the `express` command from the terminal to start new [Express.js](http://expressjs.com) projects.
* `npm install` in a folder with a `package.json` file
   * Installs all project dependencies.

## Creating a module

A module is a normal JS file that **exports functions and values to be used by other modules**. Example:
```js
// Silly example module
// Note we're using a few ES6 features: fat arrow syntax to create a function,
// a default value for the parameter and template strings like in Ruby.

function sayHello(name) {
  console.log("HELLO " + name.toUpperCase() + "!");
}

// Use the `module.exports` object to indicate which functions and values will
// be available when the module is required. You can have functions that are
// used inside the module but aren't exported (private).
module.exports = {
  hello: hello
}
```

### Using a module

Use `require` to load a module and store the exported objects inside a variable. Remember that functions are values in Javascrtipt!
```js
var hello = require('./module.js');

hello("everybody");
//=> HULLO EVERYBODY!
```

### Libraries installed with `npm install` are modules too

When you run `npm install` in a project, it will look at `package.json` and install all dependencies in the `node_modules` folder. From then on you can load them with a regular `require` (no need to include the full path).
```sh
# Installs the request library (https://github.com/request/request)
# This will update the package.json file
$ npm install request --save
```
```js
// On your js file
var request = require('request');

// Gets google.com and counts the bytesize
request('http://www.google.com', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(`google.com is ${body.length / 1024} Kbytes long.`);
  }
});
```

**Note:** Be sure to add `node_modules` to your `.gitignore` file. It will be re-created every time you run `npm install`.

## Testing

Self-contained functions are very easy to test:

```js
// Our function
function squared(number) {
  return number * number;
}

// Test code
if (squared(4) === 16) {
  console.log("squared() is squaring things!");
}
else {
  console.log("squared() isn't squaring (either that or you broke math!).")
});
```

But we're writing a lot of custom code to achieve this, which isn't ideal. We looked at [Mocha](https://mochajs.org/) to make testing easier, and used it in conjunction with the built-in [assert](https://nodejs.org/api/assert.html) package. You can also require [Chai](http://chaijs.com), which provides [several different ways to match and verify return values](http://chaijs.com/api/bdd/).

Here's a Mocha test example that does the same as above:

```js
// You'll always need an assertion package - let's use assert
var assert = require('assert');

describe('squared', function() {
  it('should return 16 when the input value is 4', function() {
    assert.equal(16, squared(4));
  });
});
```
