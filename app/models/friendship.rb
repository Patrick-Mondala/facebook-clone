class Friendship < ApplicationRecord
    validates :accepted, inclusion: {in: [true, false]}
    belongs_to :requester,
        class_name: :User
    belongs_to :requested,
        class_name: :User
end