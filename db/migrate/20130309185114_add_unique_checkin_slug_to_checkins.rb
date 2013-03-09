class AddUniqueCheckinSlugToCheckins < ActiveRecord::Migration
  def change
    add_column :checkins, :unique_checkin_slug, :string
  end
end
