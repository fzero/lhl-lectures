require 'rails_helper'

RSpec.describe Bicycle, type: :model do

  context "Validations" do
    # NOTE: these matchers are provided by the `shoulda-matchers` gem
    # They're not provided automatically by RSpec itself.
    it { is_expected.to validate_presence_of(:brand) }
    it { is_expected.to validate_presence_of(:style) }
    it { is_expected.to validate_presence_of(:model) }
    it { is_expected.to validate_numericality_of(:speeds) }
  end

  # The tests below are grouped in a context, which relates
  # to the Bicycle#description method defined in bicycle.rb
  context "description" do

    # This will run before each of the following tests.
    # If we wanted to run this once, before all the tests, we'd need to
    # change it to `before :all`
    before do
      # Creating a few objects we'll use on our tests
      # Bicycles need Brands and Styles to be valid
      @norco = Brand.create(name: 'Norco', country: 'Canada')
      @cannondale = Brand.create(name: 'Cannondale', country: 'Canada')
      @fixie = Style.create(name: 'Fixie')
      @roadbike = Style.create(name: 'Road Bike')
    end

    it "should describe a multi-speed bicyle" do
      @bike = Bicycle.create(
        brand: @norco,
        style: @roadbike,
        model: "Jake The Snake",
        colour: "Red",
        speeds: 10
      )
      expect(@bike.description).to eq("Red 10-speed Norco Jake The Snake Road Bike")
    end

    it "should describe a fixie bicycle" do
      @bike = Bicycle.create(
        brand: @cannondale,
        style: @fixie,
        model: "Awesomesauce",
        colour: "Green",
        speeds: 1
      )
      expect(@bike.description).to eq("Green Cannondale Awesomesauce Fixie")
    end

  end

end
