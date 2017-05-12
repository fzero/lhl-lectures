class Style < ApplicationRecord

  has_many :bicycles

  validates :name, presence: true
end

# create_table "styles", force: :cascade do |t|
#   t.string   "name"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
# end
