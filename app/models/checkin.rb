class Checkin < ActiveRecord::Base
  attr_accessible :action, :data, :user, :checkin_id

  serialize :data, JSON

  def set_checkin_data(data)
    self.data = data
  end

end
