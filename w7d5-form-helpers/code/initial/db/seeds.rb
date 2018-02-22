# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

if Rails.env.test?
  puts "Test environment doesn't need seeding - quitting"
  exit 0
end

10.times do
  Brand.create!(name: Faker::Company.name, country: Faker::Address.country)
end

Style.create!([
  {name: 'Road Bike'},
  {name: 'Mountain Bike'},
  {name: 'Hybrid'},
  {name: 'Single-speed'},
  {name: 'Fixie'}
])

# Array-ifying brands and styles for randomization
brands = Brand.all.to_a
styles = Style.all.to_a

# Creating 50 random bikes
50.times do
  style = styles.sample
  speeds = ['Hybrid', 'Single-speed'].include?(style.name) ? 1 : rand(21) + 1

  Bicycle.create!({
    brand: brands.sample,
    style: style,
    speeds: speeds,
    colour: Faker::Color.color_name.capitalize,
    model: Faker::Name.last_name
  })
end
