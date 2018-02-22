class Brand < ApplicationRecord

  has_many :bicycles

end

# create_table "brands", force: :cascade do |t|
#   t.string   "name"
#   t.string   "country"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
# end
