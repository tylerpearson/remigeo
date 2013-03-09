class AddFoursquareAuthenticationTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :foursquare_authentication_token, :string
  end
end
