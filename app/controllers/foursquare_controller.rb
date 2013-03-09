class FoursquareController < ApplicationController

  before_filter :protect_from_forgery, :except => [:push]
  skip_before_filter :verify_authenticity_token, :only => [:push]

  def push

    checkin_hash = ActiveSupport::JSON.decode(params[:checkin])

    checkin = Checkin.new(
                          :user => checkin_hash["user"]["id"],
                          :action => checkin_hash["type"],
                          :checkin_id => checkin_hash["id"],
                          :data => checkin_hash,
                          :foursquare_location_id => checkin_hash["venue"]["id"]
                        )

    checkin.save

    render :text => "success"
  end

end
