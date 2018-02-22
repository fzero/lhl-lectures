# Inheritance example

require 'pry'


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


# Every CoffeeTable is a Table

class CoffeeTable < Table

  def to_s
    "#{super} You can put coffee cups on it! Or maybe books."
  end

  def distractedly_walk_by
    puts "OUCH MY SHINS!"
  end

end


binding.pry # Play with it!
