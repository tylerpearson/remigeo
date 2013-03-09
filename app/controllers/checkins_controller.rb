class CheckinsController < ApplicationController

  def show

    @checkin = Checkin.find_by_unique_checkin_slug(params[:checkinid])

  end

end
