require 'securerandom'

class Checkin < ActiveRecord::Base
  attr_accessible :action, :data, :user, :checkin_id, :user_id, :foursquare_location_id

  serialize :data, JSON

  before_create :set_unique_checkin_slug, :set_user_id

  belongs_to :location, :class_name => 'Location', :foreign_key => 'foursquare_location_id'

  def set_checkin_data(data)
    self.data = data
  end

  def set_unique_checkin_slug
    token = SecureRandom.urlsafe_base64
    self.unique_checkin_slug = token
  end

  def set_user_id
    user = Authentication.find_by_uid(self.user)
    unless user.nil?
      self.user_id = user.user_id
    end
  end

  def push_respond?
    true
  end

  def push_respond_message
    # this will have the info
  end


end
