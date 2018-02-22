# Prototypes vs. classes

It was mentioned throughout the course that Javascript is a mostly functional language with object oriented features thrown in. Today we'll explore how these features work and why Javascript only recently (as in ES6) became a truly object oriented language in the traditional sense.

## ES5 and `Object`

If you've used other object oriented languages in the past, you know Javascript uses the word `Object` a lot, but...

![](inconceivable.jpg)

And you're right. JS objects are mostly key-value pairs. But because of Javascript's functional nature, you can store functions inside variables, pass them around as arguments and return functions from other functions. One of the many side effects of this behaviour is the ability to store functions within objects.

```js
const myCar = {
  make: 'Ford',
  model: 'Fiesta',
  color: 'Rust',
  state: 'rekt',
  drive: function() {
    if (this.state === 'rekt') {
      console.log(`Are you serious? This car is ${this.state}!`)
    }
    else {
      console.log('VROOOOOOM!')
    }
  }
}

// I can also add keys at will
myCar.fix = function() {
  console.log("IT'S ABOUT TIME!")
  this.state = "Fine, I guess."
}
```

This is all well and good, but we'll run into problems if we want to create multiple cars with the same structure while keeping properties and functions consistent among them - even if you create them using function constructors.

```js
// TODO
```
