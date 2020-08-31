class CreateFriendships < ActiveRecord::Migration[6.0]
  def change
    create_table :friendships do |t|
      t.integer :requester_id
      t.integer :addressee_id
      t.integer :status
      t.timestamps
    end
  end
end
