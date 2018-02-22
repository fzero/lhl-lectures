class Post < ActiveRecord::Base

  belongs_to :user
  # Is the same as:
  # def user
  #   User.find(user_id)
  # end

  validates :title, presence: true, length: { maximum: 100 }

  # ActiveRecord::Base gives us all these methods and more:

  # def initialize
  # end
  #
  # def save
  # end
  #
  # def destroy
  # end
  #
  # def update # post.update
  # end
  #
  # def self.create # Post.create
  # end
  #
  # def self.where
  # end

end
