class Post < ApplicationRecord
  belongs_to :author,
    class_name: :User
  belongs_to :timeline_owner,
    class_name: :User

  has_many :likes, as: :likeable, dependent: :destroy
  has_many :likers, through: :likes, source: :user
end