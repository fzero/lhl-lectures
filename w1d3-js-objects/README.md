# Javascript Objects (and other data types)

## Primitive data types

We know these guys already:

* String - `"Hello"`, `"banana"`, `'apple'`, `"This sentence is false."`
* Number - `1`, `378643`, `2e5`, `0xFF`
* Boolean - `true`, `false`
  * There are many other _falsey_ values: `undefined`, `null`, `NaN`, the number `0` and empty strings.
  * Everything else will evaluate to `true` inside an `if` statement.
* Array - `[1000, "This sentence isn't true", [4, 5, 6], "wat?"]`
  * ...but `typeof` will say it's an `object`
* How do I find the type of something?
  * `typeof(...)`

## Objects

Objects are first and foremost key-value pairs. Differently from Arrays, you use keys (which are _always strings_) to get data in an out. The values can be of **any type** - including arrays, other objects and functions (more on this below).

```js
var myObj = {
  key1: 'value 1',
  key2: 'value 2',
  niceArray: ['Nice', 'Supanice'],
  nestedObj: {
    name: "Nesty, the nested object!",
    condition: "Super cozy"
  }
}

myObj.key1
//=> 'value 1'
myObj['key2'] // Square bracket notation, like arrays
//=> 'value 2'
myObj.niceArray[1]
//=> 'Supanice'
myObj.nestedObj.name
//=> "Nesty, the nested object!"
myObj['nestedObj'].condition
//=> "Super cozy"
```

NOTE: Even if you try to use different data types as keys, they will be converted to strings automatically, so it's a good idea to only use strings in the first place.

```js
var weirdObj = {}
weirdObj[ [1,2,3] ] = "Whaaaaaat?" // Passing an array as key

console.log(weirdObj)
//=> { '1,2,3': 'Whaaaaaat?' }
```

Objects exist un other languages with different names:
* Python: dictionary
* Ruby: hash
* PHP: associative array  

## Functions and data handling

Parameters passed into functions will behave differently depending on the type:

* Primitive types will be **copied** into the local parameter variables. This that, if you pass a variable as a parameter, the original value **won't change**:
```js
var initialNumber = 10;
var initialString = "Hi!"

function tryToChange(number, string) {
  number = 20;
  string = "Hello!"
  console.log(number, string);
}

tryToChange(initialNumber, initialString);
//=> 20 Hello!

console.log(initialNumber, initialString);
//=> 10 Hi!
```

* Objects are different though. **If you pass an object to a function that changes values or keys on that object, you're actually changing the original.** This doesn't happen if you completely overwrite the object inside function though. The code below should make this clearer:
```js
var actor = {
  name: "Keanu Reeves",
  movies: ['Speed', 'The Matrix']
};

function tryToChange(the_actor) {
  // If you overwrite `the_actor` completely, the original object is safe
  the_actor = {
    name: 'Charlton Heston',
    movies: ['Planet of the apes']
  }
  console.log(the_actor);
}

tryToChange(actor);
//=> {name: 'Charlton Heston', movies: ['Planet of the apes']}
console.log(actor);
//=> {name: 'Keanu Reeves', movies: ['Speed', 'The Matrix']}
// The original is safe!

function actuallyChange(the_actor) {
  // Now we're changing one of the values in the_actor, which
  // _references_ the original actor.
  the_actor.name = "Jennifer Lawrence"
}

actuallyChange(actor);
console.log(actor);
//=> {name: 'Jennifer Lawrence', movies: ['Speed', 'The Matrix']}
// The original has changed!
```

### What is `this`?

The `this` keyword can be a tricky concept to understand in Javascript. The simplest explanation is:

> `this` is whatever called the function.

In other words:
```js
var redcircle = {
  color: 'red',
  shape: 'circle'
}

var bluesquare = {
  color: 'blue',
  shape: 'square'
}

var describe = function() {
  console.log(`I'm a ${this.color} ${this.shape}.`);
}

// Attaching describe() to both shapes:
redcircle.describe = describe;
bluesquare.describe = describe;

redcircle.describe();
//=> I'm a red circle.
bluesquare.describe();
//=> I'm a blue square.
```

Note how `this` takes the value of the **caller object** (whatever is before the dot: `redcircle` and `bluesquare` in the example above).

The tricky part is `this` **changes for every function call**. This can get particularly complex when you're dealing with nested functions.

## Code examples

Make sure to check the [`/code`](code) folder for additional examples discused in class.

## BONUS: Pythontutor

[PythonTutor](pythontutor.com/javascript.html#mode=edit) is a nice online tool that allows you to visualize your code while it's running. It can visualize many languages - not only Python - and we've used it in class to explore how objects and arrays are passed by reference. Here's a link to [`/code/zipper.js`](https://goo.gl/iB2S2L) within PythonTutor.