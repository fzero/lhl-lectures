json.extract! ingredient, :id, :name, :kind, :stock, :created_at, :updated_at
json.url ingredient_url(ingredient, format: :json)