class Bicycle

  attr_accessor :brand, :model, :colour
  attr_reader :speeds

  def initialize(brand, model, colour, speeds=1)
    @brand = brand
    @model = model
    @colour = colour
    @speeds = speeds
  end

  def describe
    "#{@speeds}-speed #{@colour} #{@brand} #{@model}"
  end

  # For our 'murican friends
  def color
    @colour
  end

  def color=(new_color)
    @colour = new_color
  end

  # Check type before assigning speeds
  def speeds=(speeds)
    if speeds.class != Integer
      raise "Speeds needs to be a number"
    else
      @speeds = speeds
    end
  end

end

@norco = Bicycle.new 'Norco', 'City Glide', 'Red', 21
@giant = Bicycle.new 'Giant', 'Xtreme Mountain Destroyer', 'White', 21

puts @norco.describe
puts @giant.describe
@giant.speeds = 'Apples' # Shows error message
