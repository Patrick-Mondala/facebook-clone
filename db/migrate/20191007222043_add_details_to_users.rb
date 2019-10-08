class AddDetailsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :birth_date, :date, null: false
    add_column :users, :gender, :string, null: false
    add_column :users, :bio, :string
    add_column :users, :location, :string
    add_column :users, :current_city, :string
    add_column :users, :hometown, :string
    add_column :users, :workplace, :string
    add_column :users, :education, :string
  end
end