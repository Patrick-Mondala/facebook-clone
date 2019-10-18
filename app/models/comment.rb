class Comment < ApplicationRecord
    belongs_to :post
    belongs_to :author,
        class_name: :User
    belongs_to :parent_comment,
        class_name: :Comment,
        optional: true
    has_many :child_comments,
        class_name: :Comment,
        dependent: :destroy
end