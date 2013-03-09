class Location < ActiveRecord::Base

  attr_accessible :latitude, :longitude, :title, :foursquare_location_id

  require 'open-uri'
  require 'json'

  before_create :add_location_info

  reverse_geocoded_by :latitude, :longitude

  has_many :messages
  has_many :users, :through => :messages

  private

    def add_location_info

      venue_info = JSON.parse(open("https://api.foursquare.com/v2/venues/#{self.foursquare_location_id}?client_id=#{ENV["FOURSQUARE_ID"]}&client_secret=#{ENV["FOURSQUARE_SECRET"]}").read)

      self.title      = venue_info['response']['venue']['name']
      self.latitude   = venue_info['response']['venue']['location']['lat']
      self.longitude  = venue_info['response']['venue']['location']['lng']

    end

  protected

  def to_slug
    #strip the string
    ret = self.strip

    #blow away apostrophes
    ret.gsub! /['`]/,""

    # @ --> at, and & --> and
    ret.gsub! /\s*@\s*/, " at "
    ret.gsub! /\s*&\s*/, " and "

    #replace all non alphanumeric, underscore or periods with underscore
    ret.gsub! /\s*[^A-Za-z0-9\.\-]\s*/, '_'

    #convert double underscores to single
    ret.gsub! /_+/,"_"

    #strip off leading/trailing underscore
    ret.gsub! /\A[_\.]+|[_\.]+\z/,""

    ret
  end

end
