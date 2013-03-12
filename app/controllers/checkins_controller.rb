class CheckinsController < ApplicationController

  require 'open-uri'

  def show

    # alls the info, should probably be cleaned up at some point
    @checkin  = Checkin.find_by_unique_checkin_slug(params[:checkinid])
    @user     = User.find(@checkin.user_id)
    @location = Location.find_by_foursquare_location_id(@checkin.foursquare_location_id)
    @messages = @user.messages.where("location_id = ?", @location.id)

    # for adding a new one
    @message = Message.new

  end

end
