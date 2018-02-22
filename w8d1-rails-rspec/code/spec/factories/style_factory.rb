require 'faker'

FactoryGirl.define do
  factory :style do
    name { Faker::Commerce.product_name }
  end
end
