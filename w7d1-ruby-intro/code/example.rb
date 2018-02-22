def print_items(my_array)
  my_array.each {|item| puts "Item is now: #{item}"}
  my_array.size
end

my_array = ['banana', 'apple', 'truck', 'building', 'computer', 'machine gun']

my_array << 'orange'

how_many = print_items my_array
puts "#{how_many} items in array."


# Moar below

contact = {
  name: "Fabio Neves",
  phone: "555-555-5555",
  email: "thugswag4lyfe@example.com",
  address: "The Internets"
}

contact.each do |key, value|
  puts "#{key}: #{value}"
end

puts "Name is #{contact[:name]}"
