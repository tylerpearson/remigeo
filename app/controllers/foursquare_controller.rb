class FoursquareController < ApplicationController

  before_filter :protect_from_forgery, :except => [:push]
  skip_before_filter :verify_authenticity_token, :only => [:push]

  def push

    checkin_hash = ActiveSupport::JSON.decode(params[:checkin])

    checkin = Checkin.new(
                          :user => checkin_hash["user"]["id"],
                          :action => checkin_hash["type"],
                          :checkin_id => checkin_hash["id"],
                          :data => checkin_hash
                        )

    if checkin.save
      #checkin.reply
    end

    render :nothing => true, :status => 200, :content_type => 'text/html'

  end

end
