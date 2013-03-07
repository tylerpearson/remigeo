class CreateCheckins < ActiveRecord::Migration
  def change
    create_table :checkins do |t|
      t.string :user
      t.string :action
      t.text :data

      t.timestamps
    end
  end
end
