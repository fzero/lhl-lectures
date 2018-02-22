class Bicycle < ApplicationRecord

  validates :model, presence: true
  validates :speeds, presence: true, numericality: true

  belongs_to :brand
  belongs_to :style

  def description
    return "#{colour} #{brand.name} #{style.name}." if style.name == 'Fixie'
    "#{colour} #{brand.name} #{speeds}-speed #{style.name}."
  end

end

# create_table "bicycles", force: :cascade do |t|
#   t.string   "model"
#   t.string   "colour"
#   t.integer  "speeds"
#   t.integer  "style_id"
#   t.integer  "brand_id"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.index ["brand_id"], name: "index_bicycles_on_brand_id"
#   t.index ["style_id"], name: "index_bicycles_on_style_id"
# end
