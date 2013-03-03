class AddFoursquareLocationIdToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :foursquare_location_id, :string
  end
end
