# ES6 features - Fat Arrows, string templates and other cool stuff

Things to know about fat arrows:

- New ES2015 syntax for declaring **anonymous** functions
- They are **anonymous**-only, not named as in function declarations
  - But! You can still use in a function expression as before
- Can still pass params into them
  - However, `arguments` is not defined for a fat-arrow function
  - Additionally, the scope of `this` is now what is called _lexically-scoped_, meaning it is inherited from outer scope
- Overall, fat arrows simplify syntax anywhere a callback function or handler is defined
