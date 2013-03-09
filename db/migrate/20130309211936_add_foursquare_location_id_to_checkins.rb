class AddFoursquareLocationIdToCheckins < ActiveRecord::Migration
  def change
    add_column :checkins, :foursquare_location_id, :string
  end
end
