class Message < ActiveRecord::Base
  attr_accessible :content, :location_id, :user_id, :visible
end
