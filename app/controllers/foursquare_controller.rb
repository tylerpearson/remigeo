class FoursquareController < ApplicationController

  def push
    if ActiveSupport::JSON.decode(params[:secret]) == ENV["FOURSQUARE_PUSH_SECRET"]

      checkin_hash = ActiveSupport::JSON.decode(params[:checkin])

      user   = User.find_by_uid(checkin_hash["user"]["id"])
      type = checkin_hash["type"]

      if user
        checkin = Checkin.find_by_checkin_id(checkin_hash["id"])
        checkin = Checkin.new( :user => user, :action => type, :checkin_id =>  checkin_hash["id"]) unless checkin
        #checkin.set_checkin_data checkin_hash
        checkin.save
        #checkin.process_checkin
      end

      render :text => "success"
    end
  end



end
