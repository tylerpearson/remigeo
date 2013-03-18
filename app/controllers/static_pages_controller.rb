class StaticPagesController < ApplicationController

  def index
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def home
    unless current_user.nil?
      @messages = current_user.messages.limit(5)

      if Rails.env.production?
        result = request.location
        @locations = current_user.locations.near(result.coordinates, 1, :order => :distance)
      else
        @locations = current_user.locations.near([35.99478209590909, -78.90194476318182], 1, :order => :distance)
      end

      gon.jbuilder "app/views/static_pages/home.json.jbuilder", as: "messages"
    end
    respond_to do |format|
      format.html # home.html.erb
    end
  end

end
