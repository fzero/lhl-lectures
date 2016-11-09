require 'test_helper'

class IngredientControllerTest < ActionDispatch::IntegrationTest
  test "should get name" do
    get ingredient_name_url
    assert_response :success
  end

  test "should get type" do
    get ingredient_type_url
    assert_response :success
  end

  test "should get stock:integer" do
    get ingredient_stock:integer_url
    assert_response :success
  end

end
