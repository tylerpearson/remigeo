class StaticPagesController < ApplicationController

  def index
    respond_to do |format|
      format.html # index.html.erb
    end
  end

  def home
    @messages = current_user.messages.limit(5)
    respond_to do |format|
      format.html # home.html.erb
    end
  end

end
