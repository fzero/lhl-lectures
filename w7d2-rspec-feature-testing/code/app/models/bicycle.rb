class Bicycle < ApplicationRecord

  belongs_to :style
  belongs_to :brand

  validates :brand, presence: true
  validates :style, presence: true
  validates :model, presence: true
  validates :speeds, numericality: {only_integer: true, greater_than_or_equal_to: 1}

  # Optimization trick to have all brands and styles
  # available without N+1 queries
  default_scope { includes(:brand, :style) }


  def description
    "#{colour} #{formatted_speeds} #{brand.name} #{model} #{style.name}".gsub('  ', ' ')
  end


  def formatted_speeds
    return '' if speeds == 1
    "#{speeds}-speed"
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
