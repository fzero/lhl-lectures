class AddIngredientRelationship < ActiveRecord::Migration[5.0]
  def change
    add_column :ingredients, :sandwich_id, :integer
  end
end
