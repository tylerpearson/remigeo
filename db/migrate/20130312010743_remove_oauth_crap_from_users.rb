class RemoveOauthCrapFromUsers < ActiveRecord::Migration
  def up
    remove_column :users, :provider
    remove_column :users, :uid
    remove_column :users, :foursquare_authentication_token
  end

  def down
    add_column :users, :provider
    add_column :users, :uid
    add_column :users, :foursquare_authentication_token
  end
end
