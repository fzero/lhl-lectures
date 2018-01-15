# Intro to Ruby (and a bit of OOP)

We're going to jump right in, assuming that you've got a basic grasp of the language. That is to say that you're comfortable reading this (clean) language, not yet in writing complex programs with it yet.

This lecture deals with the basic features of Ruby and how it's different from Javascript. There will be a breakout later today that will deal exclusively with the OOP aspects of Ruby.

The code discussed in class an be found inside [`/code`](code). Open [`example.js`](code/example.js) and [`example.rb`](code/example.rb) side by side for a direct comparison between the languages.

## Topics

* How is Ruby conceptually different from JS & Node?
  * Conventions
  * Paradigms
  * Usage In The Wild
  * Web and otherwise
  * Ecosystem
  * Advantages (wins) and Disadvantage (losses)
* How they are different Technically
  * OOP vs. (mostly) functional
    * Everything is an object and every is based on a class
    * Classes can inherit code from other classes
  * Methods & blocks vs. functions & callbacks
    * Methods are the same as functions, but Ruby doesn't allow you to store methods in variables
    * Every time you write the name of a method **you're actually calling it and getting its return value**. In other words, there's no difference between `do_something` and `do_something()` like in Javascript - the method always executes!
    * Whenever you need to pass code to a method, you use **blocks**, which are distant cousins to callbacks.
    * Mind you, there *are* other constructs that are more similar to callback functions in Ruby. They're called Procs and Lambdas, and they can be stored in variables. [This article has a nice breakdown of these concepts](http://www.reactive.io/tips/2008/12/21/understanding-ruby-blocks-procs-and-lambdas).
  * Concurrency Model
    * I/O blocking and general lack of callbacks
    * Javascript doesn't wait, but Ruby does.
    * You can actually write something like `body = HTTP.get('http://wikipedia.org/kittens')` and it will work.
  * Scoping
    * Block-scoping vs. function scoping: local variables in ruby are scoped to each **block** instead of each **method**.
    * You also have instance variables (identified by an `@` symbol at the beginning), class variables (`@@`, accessible to all instances of a class) and global variables (`$` at the beginning).
    * All variables without _sygils_ (the symbols at the beginning) are **local by default**.
* Similarities between the two
  * Dynamic typing / Duck typing
  * Everything can be changed during runtime
  * Ruby gems vs. npm packages (a.k.a. There's a gem for that™)
* Common gotchas when learning Ruby
  * Optional, required, and recommended things in the syntax
    * Way less punctuation! Method calls don't need braces.
  * Common data structures and their methods
    * You still have numbers, strings, booleans, arrays and hashes (equivalent to objects in JS).
    * There's an additional type: **symbol**. They're kinda sorta like strings, but they're generally used internally to identify data in situations where the user doesn't need to see it. The most common example is keys in hashes. [This article expands a bit on these concepts.](http://rubylearning.com/satishtalim/ruby_symbols.html)
    * There are **only two falsey values**: `nil` and `false`. Everything else evaluates to `true`.
  * Defining methods, scope, and interacting with objects

## A bit more about blocks

Blocks are a rather unique Ruby feature, and it's hard to find a good beginner's guide. Here's a quick summary:

A block is a piece of code you can pass to a method. Inside that method, the block is represented by `yield`. Simplest possible example:

```ruby
def receives_block
  puts "Before yield"
  yield
  puts "After yield"
end

receives_block do
  puts "This is all happening inside receives_block"
  puts "All this code is represented by the yield keyword"
  puts "Still in there"
  puts "And now we're out"
end
```

output:
```
Before yield
This is all happening inside receives_block
All this code is represented by the yield keyword
Still in there
And now we're out
After yield
```

`yield` can also return a value. When that happens, the return value will be put in the "chute" (the variable between vertical bars):
```ruby
def receives_block_with_yield
  yield "I'm yielding this!"
end

receives_block_with_yield do |yielded|
  puts "The block yielded: #{yielded}"
end
```

Output:
```
The block yielded: I'm yielding this!
```

Take a look at [`/code/blocks.rb`](code/blocks.rb) for more examples. For a more in-depth explanation, please refer to this article:
http://www.reactive.io/tips/2008/12/21/understanding-ruby-blocks-procs-and-lambdas

## Classes and OOP

There's a breakout this afternoon that will go more in-depth about classes, but I've included two code examples implementing classes: [`/code/contacts.rb`](code/contacts.rb) and [`/code/bicycle.rb`](code/bicycle.rb). Both pieces of code define **classes** that create **instances** with attributes and methods.
