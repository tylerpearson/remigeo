class AddCheckinIDtoCheckins < ActiveRecord::Migration
  def change
    add_column :checkins, :checkin_id, :string
  end
end
