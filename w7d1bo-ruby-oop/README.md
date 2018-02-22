# Ruby and OOP

First a little recap:

## Procedural
Code and data are separate entities; the code receives input data, processes it and outputs modified data. There's absolutely nothing wrong with it, and it may be the right choice for _very_ simple projects (scripts etc.).

## Object Oriented
Instead of simply acting upon data, the code is written in a way that describes _things_ (**objects**) having properties and behaviours (**methods**). Every different object belongs to a **class**, which describes all properties and methods that each **instance** of that class of objects can have.

### Classes

* Everything is an object and every object has a class
    - All objects inherit from `Object` (which inherits from `BasicObject`!) or `Kernel`
    - Use `<Object>.class` to find out the class
    - Use `<Class>.superclass` to find out the parent class
* How to create a class
    - `initialize`
        + defining properties (instance variables)
        + reading properties (getters, `attr_reader`)
        + changing properties (setters, `attr_writer`)
        + shortcuts (`attr_accessor`)
    - Scopes (separate memory spaces)
        + regular variables -> restricted to a block
        + instance variables (`@variable`) -> restricted to instance
        + class variables (`@@variable`) -> available to all objects in a class
    - Instance vs. class methods
        + Using `self`
            * References the **current instance** inside instance methods
            * Used to define class methods whem used with `def`

### Inheritance

Inheritance is all about reusing code. The concept of `class` allows you to create a generic description of a particular thing (e.g. a table) and then reuse that definition to create a specialized version of that thing (e.g. a coffee table). In Ruby this would look something like this:

```ruby
class Table

  attr_reader :width, :length, :height, :weight, :legs, :material

  def initialize(width, length, height, weight,
                 legs=4, material='wood')
    @width = width
    @length = length
    @height = height
    @weight = weight
    @legs = legs
    @material = material
  end

  def to_s
    "#{@legs}-legged table made of #{@material}. " +
    "WxLxH: #{@width}x#{@length}x#{@height}cm. Weight: #{@weight}Kg."
  end

  def heavy?
    weight > 20 # Kg
  end

end


class CoffeeTable < Table

  def to_s
    "#{super} You can put coffee cups on it! Or maybe books."
  end

  def distractedly_walk_by
    puts "OUCH MY SHINS!"
  end

end
```

In the code above, all instances of `CoffeeTable` will have all methods defined in `Table`, plus `distractedly_walk_by`.

```ruby
ikea_hemnes = CoffeeTable.new(90, 90, 46, 18.90) # Yes I looked it up

ikea_hemnes.heavy?
#=> false

puts ikea_hemnes
#=> 4-legged table made of wood. WxLxH: 90x90x46cm. Weight: 18.9Kg. You can put coffee cups on it! Or maybe books.

ikea_hemnes.distractedly_walk_by
#=> OUCH MY SHINS!
```

This is a silly example, of course. Usually classes will describe things like database tables, app components and so on - and that's precisely where OOP shines. Tomorrow we'll talk about [**ActiveRecord**](http://guides.rubyonrails.org/active_record_basics.html) and how it uses class inheritance to provide a generic interface to deal with databases pretty much without writing any database-handling code at all.

## Code

We've worked on the Candidates assignment and solved it using classes. See the [`/code/candidates_oop`](code/candidates_oop) folder for the complete code. Also check out [`/code`](code) for class inheritance examples with tables and computers. 
