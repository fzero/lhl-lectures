FactoryGirl.define do
  factory :bicycle do
    model "Model"
    colour "Red"
    speeds 1
    style { FactoryGirl.build(:style) }
    brand { FactoryGirl.build(:brand) }

    trait :fixie do
      style { FactoryGirl.build(:style, name: "Fixie") }
      speeds 1
    end

    trait :road do
      style { FactoryGirl.build(:style, name: "Road Bike") }
      speeds 21
    end

    trait :red do
      colour 'Red'
    end

    trait :brand_x do
      brand { FactoryGirl.build(:brand, name: "Brand X") }
    end

    factory :fixie_bike, traits: [:fixie]
    factory :road_bike, traits: [:road]
    factory :red_brand_x_fixie_bike, traits: [:fixie, :red, :brand_x]
    factory :red_brand_x_road_bike, traits: [:road, :red, :brand_x]
  end

end
