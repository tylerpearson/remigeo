class CheckinsController < ApplicationController

  def show

    @checkin = Checkin.find_by_unique_checkin_slug(params[:checkinid])
    @user = User.find(@checkin.user_id)
    @location = Location.find_by_foursquare_location_id(@checkin.foursquare_location_id)
    @messages = @user.messages.where("location_id <= ?", @location.id)

  end

end