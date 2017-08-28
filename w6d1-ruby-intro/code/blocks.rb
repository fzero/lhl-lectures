# First example: a method that takes an argument and can also take an optional
# block. You can use block_given? to detect if a block is present.

def takes_block(arg)
  puts "I got an argument! It's #{arg}!"
  puts "I'm still in the method!"
  yield if block_given?
  puts "More stuff!"
  puts "Even more stuff"
end

takes_block("NO BLOCKS HERE!")

takes_block("BLOCK HERE!") do
  10.times {puts "Heeeeeey!"}
end

# Second example: a method that yields a value. This value will be sent to the
# variable inside the "chute" (the |var| operator)
# This is how Array#each works, for example.

def yields_value
  puts "Before yield"
  yield 4 # Random number, decided by dice roll
  puts "After yield"
end

yields_value do |yodeled|
  puts "I got #{yodeled}!"
end

def yields_double(array)
  array.each {|element| yield element * 2}
  # array.each {|element| puts "I got this: #{element * 2}"}
end

yields_double([1,2,3,4,5,'banana']) do |yield_result|
  puts "I got this: #{yield_result}"
end
