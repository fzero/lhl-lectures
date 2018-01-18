# Callbacks - your new best friends!

Callbacks - or function arguments - are one of the most important and powerful features of Javascript. They're used extensively when you need to process several elements of an array or object at once and also when sending/receiving information to/from servers over the internet.

But before we get to callbacks, it's important to understand a very fundamental concept of Javascript:

## Everything is data

While many languages keep code and data completely separated, Javascript does things differently. So far we've been creating functions like this:
```js
function doSomething(thing) {
  console.log("Hooray, now I'm " + thing + "ing!");
}
```

Now we can type `doSomething("sing")` and see `Hooray, now I'm singing!` on the screen. So far so good. But we can also declare the exact same function like this:
```js
var doSomething = function(thing) {
  console.log("Hooray, now I'm " + thing + "ing!");
}
```

Congratulations, you've just put a function inside a variable! This pattern is known as a _function expression_. The end result is the same: `doSomething("sing")` will output `Hooray, now I'm singing!`.

But wait a second. If I can do this:
```js
var name = "James Bond";
console.log(name);
// James Bond
```

Then this should work too:
```js
console.log(doSomething);
// [Function: doSomething]
```

Note that we didn't put parenthesis after `doSomething` in the example above. That's because `doSomething()` **runs the function and gets its return value** while `doSomething` simply **references the function itself**.

Now let's think about the implications of that:

* Strings, numbers, arrays and everything else are values that I can put inside variables.
* I can call functions passing any of these values as arguments and everything will work fine.
* If functions are just another type of data, **I can pass functions as arguments to other functions!**

And that's exactly what callbacks / function arguments are all about.

## Practical example

Let's say we want to print all elements of an array to the screen. We could write a function like this:

```js
var someNumbers = [1, 2, 3];

function logEach(array) {
  for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

logEach(someNumbers);
```

But what if I want to do other things to the array elements without having to write a separate function every time? I could create a function that takes **an additional argument containing the function that will be executed with each element of the array**. Something like this:

```js
function forEach(array, action) {
  for (var i = 0; i < array.length; i++) {
    action(array[i]);
  }
}
```

And then...
```js
function fancyLog(number) {
  console.log("--==> " + number + " <==--");
}

forEach(someNumbers, fancyLog);
// --==> 1 <==--
// --==> 2 <==--
// --==> 3 <==--
```

## Helpful analogy

A good way to visualize this is by comparing it to a food processor:

![Food Processor](http://s3.fzero.ca/stuff/foodproc.jpg)

The food processor doesn't do anything by itself, but once you insert one of the accessories, it becomes a slicer, grater or blender. You could write that in (pseudo) code like this:

```js
// First our high-order function
function processFood(foodItem, action) {
  if (typeof(action) !== 'function') { // Nothing to do if action isn't a function!
    console.log("Whirrrrrrrrrrr...");
    return;
  }
  action(foodItem);
}

// Now our callbacks (or function arguments)
function slice(foodItem) {
  console.log("Your " + foodItem + " is now sliced!");
}

function grate(foodItem) {
  console.log("Your " + foodItem + " is now grated!");
}

function blend(foodItem) {
  console.log("Your " + foodItem + " is now blended! Mmmm... smoothie!");
}

// And now we use it
processFood("carrot", grate);
// "Your carrot is now grated!"

processFood("carrot"); // No action! Just noise.
// "Whirrrrrrrrrrr..."
```

Notice that `processFood()` won't even work if you don't pass in an action.

## Reasoning behind the term "callback"

You'll find that most JS documentation refers to function arguments as _callbacks_, which can be a bit confusing (what exactly are we calling back?), but there's a reason behind it.

There are several operations that can take time to be completed - especially ones related to network connections. The people who designed Javascript opted to keep the language fast by making most operations that take time  _asynchronous_, meaning that the main program _won't wait for them to be completed_.

In those situations, we use functions that receive a function to be _called back_ with the results once the operation is done - hence the name. We'll discuss asynchronous callbacks in depth in the coming weeks, so don't worry too much about it right now.

There's a quick example that pulls some pages from the web inside [`/request-example`](request-example). We'll explore the `request` package and other similar code extensively on week 2, so don't worry too much about the details right now. Just notice how we **must** pass a function to `request.get()` to receive results.

## Example code!

Be sure to take a look inside [`/code`](code) for more examples on using callbacks. [`foreach.js`](code/foreach.js) and [`processfood.js`](code/processfood.js) are rather basic, while [`game.js`](code/game.js) and [`game-v2.js`](code/game-v2.js) are more advanced and also include examples of objects and introspection using `this`.
