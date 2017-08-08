require 'rails_helper'
require 'support/database_cleaner'

RSpec.feature "Bicycle index", type: :feature, js: true do

  before :each do
    @brand = FactoryGirl.create(:brand, name: 'Brand', country: 'Canada')
    @hildebrand = FactoryGirl.create(:brand, name: 'Hildebrand', country: 'USA')
    @exterminator = FactoryGirl.create(:brand, name: 'Exterminator', country: 'USA')

    @fixie = FactoryGirl.create(:style, name: 'Fixie')
    @hybrid = FactoryGirl.create(:style, name: 'Hybrid')
    @bmx = FactoryGirl.create(:style, name: 'BMX')

    @bike1 = FactoryGirl.create(:bicycle,
      brand: @brand,
      style: @fixie,
      speeds: 1,
      colour: 'Red',
      model: 'Moustache'
    )
    @bike2 = FactoryGirl.create(:bicycle,
      brand: @hildebrand,
      style: @hybrid,
      speeds: 10,
      colour: 'Black',
      model: 'Roadmeister'
    )
    @bike3 = FactoryGirl.create(:bicycle,
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

  scenario "Filter bikes by speeds" do
    visit "/bicycles"

    fill_in :speeds, with: 10
    click_on "Search!"

    expect(page).to have_css('div.bicycle', count: 1)
    expect(page).to have_text('Black 10-speed Hildebrand Roadmeister Hybrid', count: 1)
    save_screenshot('filtered_by_speeds.png')
  end

  scenario "Filter bikes by style" do
    visit "/bicycles"

    select 'Hybrid', from: 'bicycle-style'
    click_button 'Search!'

    expect(page).to have_css('div.bicycle', count: 1)
    expect(page).to have_text('Black 10-speed Hildebrand Roadmeister Hybrid', count: 1)
    save_screenshot('filtered_by_style.png')
  end

  scenario "Filter bikes by brand" do
    visit "/bicycles"

    select 'Exterminator', from: 'brand'
    click_button 'Search!'

    expect(page).to have_css('div.bicycle', count: 1)
    expect(page).to have_text('Extreme chrome Exterminator DESTROYENATOR BMX', count: 1)
    save_screenshot('filtered_by_brand.png')
  end

end
