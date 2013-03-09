class FoursquareController < ApplicationController

  before_filter :protect_from_forgery, :except => [:push]

  client = Foursquare2::Client.new(:client_id => ENV["FOURSQUARE_ID"], :client_secret => ENV["FOURSQUARE_SECRET"])

  def push

    if ActiveSupport::JSON.decode(params[:secret]) == ENV["FOURSQUARE_PUSH_SECRET"]

      checkin_hash = ActiveSupport::JSON.decode(params[:checkin])

      #user   = User.find_by_uid(checkin_hash["user"]["id"])
      #type   = checkin_hash["type"]

      checkin = Checkin.new(
                          :user => checkin_hash["user"]["id"],
                          :action => checkin_hash["type"],
                          :checkin_id => checkin_hash["id"],
                          :data => checkin_hash
                        )

      #if user
        #checkin = Checkin.find_by_checkin_id(checkin_hash["id"])
        #checkin.set_checkin_data checkin_hash
      checkin.save
        #checkin.process_checkin
      #end

      format.json { head :ok }
    end
  end

end
