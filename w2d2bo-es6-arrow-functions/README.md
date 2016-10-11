# ES6 features - Fat Arrows and other cool stuff

Things to know about fat arrows:

- New ES2015 syntax for declaring **anonymous** functions
- They are **anonymous**-only, not named as in function declarations
  - But! You can still use in a function expression as before
- Can still pass params into them
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

Usually `this` contains the object that called the function, but fat arrow functions **inherit `this` from the outer scope**. The jargonesque way of explaining it is: the scope of `this` is now _lexically-scoped_.

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

If you run the code above you'll see `NaN` being printed every second. This is because `this` means different things inside `counter` and inside the anonymous function being called by `setInterval`. If you're curious, both `setInterval` and `setTimeout` run the inner function to the global scope, which means `this` is the same as `global`.

Now let's try this with a fat arrow function:

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

Overall, fat arrows simplify syntax anywhere a callback function or handler is defined, but always remember to check if `this` contains what you think it does!
