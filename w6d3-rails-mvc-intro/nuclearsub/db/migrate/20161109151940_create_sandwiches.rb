class CreateSandwiches < ActiveRecord::Migration[5.0]
  def change
    create_table :sandwiches do |t|
      t.string :name
      t.float :price
      t.string :size

      t.timestamps
    end
  end
end
