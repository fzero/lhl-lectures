# Inheritance example

require 'pry'


class Computer

  attr_reader :brand, :model  # you can't change brand or model...
  attr_accessor :os           # ...but you can install a new OS!

  def initialize(brand, model, os)
    @brand = brand
    @model = model
    @os = os
  end

  def to_s
    "#{@brand} #{@model} running #{@os}."
  end

end


# Every laptop is a computer

class Laptop < Computer

  def suspend
    puts "Your laptop is now sleeping..."
  end

end


# And yes, every cellphone is a computer too!

class Cellphone < Computer

  def call(number)
    puts "You're now calling #{number}!"
  end

end


@macbook = Laptop.new("Apple", "Macbook", "macOS")
@pixel = Cellphone.new("Google", "Pixel", "Android")

binding.pry # Play with it!
