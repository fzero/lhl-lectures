FactoryBot.define do
  factory :bicycle do
    model "Model"
    colour "Red"
    speeds 1
    style { FactoryBot.build(:style) }
    brand { FactoryBot.build(:brand) }

    trait :fixie do
      style { FactoryBot.build(:style, name: "Fixie") }
      speeds 1
    end

    trait :road do
      style { FactoryBot.build(:style, name: "Road Bike") }
      speeds 21
    end

    trait :red do
      colour 'Red'
    end

    trait :brand_x do
      brand { FactoryBot.build(:brand, name: "Brand X") }
    end

    factory :fixie_bike, traits: [:fixie]
    factory :road_bike, traits: [:road]
    factory :red_brand_x_fixie_bike, traits: [:fixie, :red, :brand_x]
    factory :red_brand_x_road_bike, traits: [:road, :red, :brand_x]
  end

end
