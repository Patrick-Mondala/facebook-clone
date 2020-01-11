class AddLikeableTypeToLikes < ActiveRecord::Migration[5.2]
  def change
    add_column :likes, :likeable_type, :string, null: false
  end
end
