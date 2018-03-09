class Client < ApplicationRecord

  def name
    "#{first_name} #{last_name}"
  end

  # This controls how ActiveRecord will return data converted to JSON
  def as_json(options={})
    {
      id: id,
      firstName: first_name, # Sneaky conversion to camelCase
      lastName: last_name,
      name: name,
      email: email,
      created_at: created_at,
      updated_at: updated_at
    }
  end

end
