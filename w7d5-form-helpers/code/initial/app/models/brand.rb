class Brand < ApplicationRecord

  has_many :bicycles

  validates :name, presence: true
  validates :country, presence: true

end
