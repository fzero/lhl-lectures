require 'faker'

FactoryBot.define do
  factory :style do
    name { Faker::Commerce.product_name }
  end
end
