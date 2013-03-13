require 'net/http'

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

    if checkin.save && checkin.push_respond?
      user = User.find(checkin.user_id)
      reply_url = "https://api.foursquare.com/v2/checkins/#{checkin.checkin_id}/reply"
      url = URI.parse(reply_url)
      req = Net::HTTP::Post.new(url.path)
      params = { :url => "https://vast-sea-8529.herokuapp.com/checkin/#{checkin.unique_checkin_slug}/",
        :text => "Nice checkin! Would you like to add a message?",
        :oauth_token => user.authentications.find_by_provider("foursquare").token,
        :v => "20130311" }
      req.set_form_data(params)
      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      response = http.request(req)
      puts response
    end

    render :text => "success"
  end

end
