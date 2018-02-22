class CreateBicycles < ActiveRecord::Migration[5.0]
  def change
    create_table :bicycles do |t|
      t.string :model
      t.string :colour
      t.integer :speeds
      t.references :style
      t.references :brand

      t.timestamps
    end
  end
end
