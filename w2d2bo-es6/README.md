# ES6 features

There are two main versions of Javascript being used these days - ES5 and ES6. The former is supported by all browsers and Node.js, while the latter is being implemented. As of the beginning of 2017, most browsers support around 90% of ES6, while Node supports pretty much all of it.

The features listed below ar available in all modern browsers (this excludes Internet Explorer - use Edge instead if you like Windows).

## `"use strict";`

This is an ES5 (yes, _five_) feature that instructs the Javascript interpreter to be more strict when checking code. It's triggered by adding the `"use strict";` string to the top of a file or function. [MDN has a detailed list of changes brought by strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

## `for...of` and `for...in`

These are two different flavours of `for` loops used for iteration of Arrays (`for...of`) and Objects (`for...in`).

```js
// Each element of the artists array will be assigned to
// the artist variable in turn.
let artists = ['Jamie XX', 'Ke$ha', 'Madonna'];
for (let artist of artists) {
  console.log(artist);
}

// Each key of the object will be assigned to the key variable in turn.
// Note that we use the key to get values from the object.
let contactInfo = {
  firstName: 'James',
  lastName: 'Bond',
  codeName: '007'
}
for (let key in contactInfo) {
  console.log(`${key}: ${contactInfo[key]}`);
}
```

## `let` and `const` vs `var`

In a nutshell:

* `var` is scoped to the function, while `let` is scoped to a block
```js
/*
 * We'll define a variable inside this for loop with `var` first:
 */
for (var i = 0; i < 10; i++) {
  var inside = i * 10;
  console.log(inside);
}

console.log('i:', i);
//=> i: 9

console.log('inside:', inside);
//=> inside: 90

/*
 * Now the same thing with `let`:
 */
for (let x = 0; x < 10; x++) {
  let insideX = x * 10; // These variables only exist inside this `for`
  console.log(insideX);
}

console.log('x:', x);
//=> ReferenceError: x is not defined

console.log('insideX:', insideX);
//=> ReferenceError: insideX is not defined
```

* `const` creates a value that can't be changed afterwards.
```js
const magicNumber = 10;
magicNumber = 20;
//=> TypeError: Assignment to constant variable.
```

## String Interpolation, a. k. a. template strings

In ES6, strings delimited with backticks receive the amazing super-power of displaying the values of variables and javascript expressions in-line. This means instead of writing this:
```js
let firstName = "Leeroy";
let lastName = "Jenkins";
console.log('His name is ' + firstName + ' ' + lastName + '.');
```

You can write:
```js
console.log(`His name is ${firstName} ${lastName}.`);
```

## Arrow functions

Things to know about arrow functions:

- New ES2015 syntax for declaring **anonymous** functions
- They are **anonymous**-only, not named as in function declarations
  - But! You can still use in a function expression as before
- Can still pass arguments into them
  - However, `arguments` is not defined for a fat-arrow function. In other words:
```js
function args() {
  console.log(arguments);
}

args("first", 2, [1,2,3]);
// => { '0': 'first', '1': 2, '2': [ 1, 2, 3 ] }


const arghs = () => {
  console.log(arguments);
}

arghs("first", 2, [1,2,3]);
// => ReferenceError: arguments is not defined
```

But the biggest difference is...

## `this` works differently

Usually `this` contains the object that called the function, but arrow functions **inherit `this` from the outer scope**. The jargonesque way of explaining it is: the scope of `this` is now _lexically-scoped_.

Clearly this item requires a bit more explanation, so let's do it! Take this code with regular functions:

```js
function counter() {
  this.age = 0;

  setInterval(function() {
    this.age += 1;
    console.log(this.age);
  }, 1000);
}
```

If you run the code above you'll see `NaN` being printed every second. That's because `this` means different things inside `counter` and inside the anonymous function being called by `setInterval`. If you're curious, both `setInterval` and `setTimeout` run the inner function on the global scope, which means `this` is the same as `global`.

Now let's try this with a arrow function:

```js
function counter() {
  this.age = 0;

  setInterval(() => {
    this.age += 1;
    console.log(this.age);
  }, 1000);
}
```

This version actually works as intended, since the value of `this` is inherited by the anonymous function inside `setInterval`.

Overall, arrow functions simplify syntax anywhere a callback function or handler is defined, but always remember to check if `this` contains what you think it does!
