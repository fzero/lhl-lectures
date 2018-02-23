# Prototypes vs. classes

It was mentioned throughout the course that Javascript is a mostly functional language with object oriented features thrown in. Today we'll explore how these features work and why Javascript only recently (as in ES6) became a _truly_ object oriented language in the traditional sense.

## ES5 and `Object`

If you've used other object oriented languages in the past, you know Javascript uses the word `object` a lot, but...

![](inconceivable.jpg)

And you're right. JS objects are mostly key-value pairs. But because of Javascript's functional nature, you can store functions inside variables, pass them around as arguments and return functions from other functions. One of the many side effects of this behaviour is the ability to store functions within objects:

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

This is all well and good, but we'll run into problems if we want to create multiple cars with the same structure while keeping properties and functions consistent among them - which is what people usually expect when someone says `Object`.

#### What about constructor functions?

There's another way to create objects which _looks_ like it addresses this problem:

```js
// This is a constructor function, designed to be used with the `new` keyword.
// Notice how each property is assigned to `this`
function Apple(type) {
  this.type = type;
  this.color = "red";
  this.getInfo = function() {
    return this.color + ' ' + this.type + ' apple';
  };
}

var myApple = new Apple('macintosh');
myApple.color = "reddish";

console.log(myApple.getInfo());
//=> "reddish macintosh apple"

// Now we sneakily change Apple.getInfo()
// Someone with OOP background could think this would alter the behaviour
// of all objects created with `new Apple(...)` ...
Apple.getInfo = function() {
  return "LOL I'VE CHANGED THIS!";
}

// ...but no!
console.log(myApple.getInfo());
//=> "red macintosh apple"
```

And this is where we finally reach our main subject!

## `Object.prototype`

It turns out there **is** a way to create a _template_ to create multiple objects **and** ensure all objects will be modified at once when the template is changed. This is used by all native Javascript objects - `String`, `Number`, `Array` and so on.

Sticking to our Apple example:

```js
// We start more or less the same way...
function Apple(type) {
  this.type = type;
  this.color = "red";
}

// ...then we add a twist
Apple.prototype.getInfo = function() {
  return this.color + ' ' + this.type + ' apple';
};

var apple1 = new Apple('macintosh');
var apple2 = new Apple('gala');

console.log(apple2.getInfo());
//=> "red gala apple"

// Instead of changing Apple directly, we change Apple.prototype
Apple.prototype.getInfo = function() {
  return "LOLOLOL NOPE"
};

// This actually does what we expect!

console.log(apple1.getInfo());
//=> "LOLOLOL NOPE"

console.log(apple2.getInfo());
//=> "LOLOLOL NOPE"
```

The `prototype` is the template used by all objects based the "master" object. This is called [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) and it was the _only_ kind of inheritance in Javascript for a long time.

## Classes

ES6 finally brought actual OOP to Javascript, including features like classes and inheritance. If we'd try to recreate the Apple example above with classes, it could look something like this:

```js
class Apple {
  constructor(type) {
    this.type = type
    this.color = "red"
  }

  getInfo() {
    return `${this.color} ${this.type} apple`
  }
}

const apple1 = new Apple('macintosh')
const apple2 = new Apple('gala')

console.log(apple1.getInfo())
//=> "red macintosh apple"

console.log(apple2.getInfo())
//=> "red gala apple"
```

So much better! It's also possible to mark a class function (usually called a **method**) as a _getter_ or a _setter_. This makes it possible to use these methods as if they were properties:

```js
class Apple {
  constructor(type) {
    this.type = type
    this.color = "red"
    this.delicious = true
  }

  get description() {
    return `${this.color} ${this.type} apple`
  }

  set taste(howItTastes) {
    this.delicious = Boolean(howItTastes.match(/good|awesome|sweet|delicions/i))
  }
}

const apple = new Apple('gala')

apple.description
//=> "red gala apple"

apple.taste = 'awesome'
apple.delicious
//=> true
```

And if we wanted to make things interesting adding inheritance:

```js
class GalaApple extends Apple {
  constructor() {
    super('gala')
  }
}

const myApple = new GalaApple()

apple.description
//=> "red gala apple"
```

In reality, JS classes are simply _syntatic sugar_ for prototypes - in other words, prorotypes are **always** used internally to implement OOP features. You don't need to worry about this 99% of the time, but it doesn't hurt to be aware of it.
