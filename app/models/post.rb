class Post < ApplicationRecord
    belongs_to :author,
        class_name: :User
    belongs_to :timeline_owner,
        class_name: :User
end