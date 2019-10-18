class CreateFriendships < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.integer :requester_id, null: false
      t.integer :requested_id, null: false
      t.boolean :accepted, null: false, default: false

      t.timestamps
    end
  end
end