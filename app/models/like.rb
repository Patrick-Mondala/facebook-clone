class Like < ApplicationRecord 
  validates :likeable_type, presence: true

  belongs_to :user
  belongs_to :likeable, polymorphic: true
end 