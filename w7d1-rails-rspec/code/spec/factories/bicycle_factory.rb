FactoryGirl.define do
  factory :bicycle do
    model "Model"
    colour "Red"
    speeds 1
    style { Style.new(name: "Style") }
    brand { Brand.new(name: "Brand X", country: "Countrystan") }

    trait :fixie do
      style { Style.new(name: "Fixie") }
      speeds 1
    end

    trait :road do
      style { Style.new(name: "Road Bike") }
      speeds 21
    end

    trait :red do
      colour 'Red'
    end

    trait :brand_x do
      brand { Brand.new(name: "Brand X", country: "Countrystan") }
    end

    factory :fixie_bike, traits: [:fixie]
    factory :road_bike, traits: [:road]
    factory :red_brand_x_fixie_bike, traits: [:fixie, :red, :brand_x]
    factory :red_brand_x_road_bike, traits: [:road, :red, :brand_x]
  end

end
