require 'faker'

FactoryGirl.define do
  factory :brand do
    name "Brand X"
    country { Faker::GameOfThrones.city }
  end
end
