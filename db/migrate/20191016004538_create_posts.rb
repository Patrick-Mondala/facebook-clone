class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false
      t.integer :timeline_owner_id, null: false
      t.string :body

      t.timestamps
    end
    add_index :posts, :author_id
    add_index :posts, :timeline_owner_id
  end
end
