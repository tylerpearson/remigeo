class Checkin < ActiveRecord::Base
  attr_accessible :action, :data, :user, :checkin_id

  serialize :data, JSON

  def set_checkin_data(data)
    self.data = data
  end

  token = SecureRandom.urlsafe_base64

  while Checkin.where(:token => token).any?
    token = SecureRandom.urlsafe_base64
  end

  #def create_reply(message)
  #  reply_url = "https://api.foursquare.com/v2/checkins/#{checkin_id}/reply"
  #  url = URI.parse(reply_url)
  #  req = Net::HTTP::Post.new(url.path)
  #  params = { :url => "https://vast-sea-8529.herokuapp.com//response/#{token}/",
  #    :text => message,
  #    :oauth_token => user.foursquare_access_token,
  #    :v => "20120827" }
  #  req.set_form_data(params)
  #  http = Net::HTTP.new(url.host, url.port)
  #  http.use_ssl = true
  #  response = http.request(req)
  #  puts response
  #end

  def reply

    #reply_url = "https://api.foursquare.com/v2/checkins/#{checkin_id}/reply"
    #url = URI.parse(reply_url)
    #req = Net::HTTP::Post.new(url.path)
    #params = { :url => "https://vast-sea-8529.herokuapp.com/response/#{token}/",
    #  :text => message,
    #  :oauth_token => user.foursquare_access_token,
    #  :v => "20120827" }
    #req.set_form_data(params)
    #http = Net::HTTP.new(url.host, url.port)
    #http.use_ssl = true
    #response = http.request(req)
    puts response

  end

end
