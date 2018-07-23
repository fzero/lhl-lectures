require 'rails_helper'

RSpec.describe Bicycle, type: :model do

  context "Validations:" do

    it { is_expected.to validate_presence_of(:model) }
    it { is_expected.to validate_presence_of(:speeds) }
    it { is_expected.to validate_numericality_of(:speeds) }

  end

  context "Relationships:" do

    before :each do
      @brand = FactoryBot.build(:brand)
      @style = FactoryBot.build(:style)
      @bicycle = FactoryBot.build(:bicycle)
    end

    it "Should belong to brand" do
      @bicycle.brand = @brand
      expect(@bicycle.brand).to eq(@brand)
    end

    it "Should belong to style" do
      @bicycle.style = @style
      expect(@bicycle.style).to eq(@style)
    end

  end

  context "Formatting:" do

    before :each do
      @fixie = FactoryBot.build(:red_brand_x_fixie_bike)
      @road_bike = FactoryBot.build(:red_brand_x_road_bike)
    end

    it "returns a formatted description of a bicycle" do
      expect(@fixie.description).to eq("Red Brand X Fixie.")
      expect(@road_bike.description).to eq("Red Brand X 21-speed Road Bike.")
    end

  end

end
