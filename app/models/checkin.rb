class Checkin < ActiveRecord::Base
  attr_accessible :action, :data, :user


  def set_checkin_data(data)
    self.data = data
  end

end
