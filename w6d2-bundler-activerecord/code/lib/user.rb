class User < ActiveRecord::Base

  has_many :posts, dependent: :destroy
  # Is the same as:
  # def posts
  #   Posts.where(user_id: id)
  # end

  validates :name, :email, presence: true
  validates :email, uniqueness: true

end
