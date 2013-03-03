class Location < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :title, :foursquare_location_id

  require 'open-uri'
  require 'json'

  before_create :add_location_info

  has_many :messages
  has_many :users, :through => :messages

  private

    def add_location_info

      venue_info = JSON.parse(open("https://api.foursquare.com/v2/venues/#{self.foursquare_location_id}?client_id=#{ENV["FOURSQUARE_ID"]}&client_secret=#{ENV["FOURSQUARE_SECRET"]}").read)

      self.title      = venue_info['response']['venue']['name']
      self.latitude   = venue_info['response']['venue']['location']['lat']
      self.longitude  = venue_info['response']['venue']['location']['lng']

    end

end
