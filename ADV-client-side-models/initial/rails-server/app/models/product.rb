class Product < ApplicationRecord

  include ActionView::Helpers::NumberHelper

  def formatted_price
    number_to_currency(price)
  end

  # This controls how ActiveRecord will return data converted to JSON
  def as_json(options={})
    {
      id: id,
      name: name,
      price: price,
      formatted_price: formatted_price,
      quantity: quantity,
      created_at: created_at,
      updated_at: updated_at
    }
  end

end
