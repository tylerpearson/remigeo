class StaticPagesController < ApplicationController

  def index
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def home
    unless current_user.nil?
      @messages = current_user.messages.limit(3)
    end
    respond_to do |format|
      format.html # home.html.erb
    end
  end

end
