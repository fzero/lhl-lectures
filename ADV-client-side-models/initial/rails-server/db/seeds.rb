# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

20.times do
  Product.create!(
    name: Faker::Commerce.product_name,
    price: rand(20000) / 100.00,
    quantity: rand(100)
  )
end

20.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  email = "#{first_name.downcase}.#{last_name.downcase}@#{Faker::Internet.domain_name}"
  Client.create!(
    first_name: first_name,
    last_name: last_name,
    email: email
  )
end
