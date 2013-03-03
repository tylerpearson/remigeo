class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content
      t.boolean :visible
      t.integer :user_id
      t.integer :location_id

      t.timestamps
    end
  end
end
