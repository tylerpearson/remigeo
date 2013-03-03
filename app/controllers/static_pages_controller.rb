class StaticPagesController < ApplicationController

  def index
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def home
    unless current_user.nil?
      result = request.location
      @locations = current_user.locations.near(result.coordinates, 1, :order => :distance).limit(20)
    end
    respond_to do |format|
      format.html # home.html.erb
    end
  end

end
