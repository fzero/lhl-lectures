# How do I dev?

Today we've discussed how to break a problem into its constituent parts and use the tools at our disposal to solve it.

This involved using the Node repl, using `console.log` statements, googling a lot and using [`node debug`](https://nodejs.org/api/debugger.html) to run our small application step by step.

## Googling protips

The best reference for Javascript at this time is [Mozilla Developer Network](https://developer.mozilla.org/en-US/). Usually searching for `mdn something` will get you straight to what you're looking for.

If you want to know about what you can do with a particular kind of variable - `Array` or `String`, for example - google `mdn array` and look on the left-hand side for definitions of `Array.prototype.<function here>`.

Think of `prototype` as master definition of a particular type. Everything attached to `prototype` is available to all things based on it. In other words, `Array.prototype.push()` means that you can use `push()` with **all arrays**.

(If you have previous experience with object oriented programming: `prototype` is very similar to `class` - but different!.)

**Example:** Let's say I want to convert a string to uppercase, so I google `mdn string prototype uppercase`. The first result was [right on the money](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)!

## Code

The code discussed in class can be found in the [`/code`](code) folder. You can also see code from previous iterations of this lecture inside [`/previous`](previous).

## Bonus: PythonTutor

[PythonTutor](http://pythontutor.com) is a nice tool to visualize how our code runs. Despite the name, it can analyze several languages including Javascript.
[Here's a link to some code similar to what we've discussed in class inside PythonTutor.](https://goo.gl/CF3wTT)
