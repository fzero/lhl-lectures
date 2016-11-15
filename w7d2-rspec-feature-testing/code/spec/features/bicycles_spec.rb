require 'rails_helper'
require 'support/database_cleaner'

RSpec.feature "Bicycle index", type: :feature, js: true do

  before :each do
    @brand = Brand.create(name: 'Brand', country: 'Canada')
    @hildebrand = Brand.create(name: 'Hildebrand', country: 'USA')
    @exterminator = Brand.create(name: 'Exterminator', country: 'USA')

    @fixie = Style.create(name: 'Fixie')
    @hybrid = Style.create(name: 'Hybrid')
    @bmx = Style.create(name: 'BMX')

    @bike1 = Bicycle.create(
      brand: @brand,
      style: @fixie,
      speeds: 1,
      colour: 'Red',
      model: 'Moustache'
    )
    @bike2 = Bicycle.create(
      brand: @hildebrand,
      style: @hybrid,
      speeds: 10,
      colour: 'Black',
      model: 'Roadmeister'
    )
    @bike3 = Bicycle.create(
      brand: @exterminator,
      style: @bmx,
      speeds: 1,
      colour: 'Extreme chrome',
      model: 'DESTROYENATOR'
    )
  end

  scenario "Lists all bikes" do
    visit "/bicycles"

    expect(page).to have_css('#bicycle-style option', count: 4)
    expect(page).to have_css('#brand option', count: 4)
    expect(page).to have_css('div.bicycle', count: 3)
    expect(page).to have_text('Red Brand Moustache Fixie', count: 1)
    expect(page).to have_text('Black 10-speed Hildebrand Roadmeister Hybrid', count: 1)
    expect(page).to have_text('Extreme chrome Exterminator DESTROYENATOR BMX', count: 1)
    save_screenshot('all_bikes.png')
  end


  scenario "Filter bikes by model" do
    visit "/bicycles"

    fill_in 'model', with: 'DESTROYENATOR'
    click_button 'Search!'

    expect(page).to have_css('div.bicycle', count: 1)
    expect(page).to have_text('Extreme chrome Exterminator DESTROYENATOR BMX', count: 1)
    save_screenshot('filtered_by_model.png')
  end

  # NOTE: I'm having issues with Capybara here. This test should work, but apparently
  # the `select` part isn't working! I'll update this with a working test as soon as
  # I find out what's wrong.
  scenario "Filter bikes by style" do
    visit "/bicycles"

    select 'Hybrid', from: 'bicycle-style'
    click_button 'Search!'

    expect(page).to have_css('div.bicycle', count: 1)
    expect(page).to have_text('Black 10-speed Hildebrand Roadmeister Hybrid', count: 1)
    save_screenshot('filtered_by_style.png')
  end

end
