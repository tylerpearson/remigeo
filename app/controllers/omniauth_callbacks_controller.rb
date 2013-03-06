class OmniauthCallbacksController < ApplicationController
  def all
    raise request.env["omniauth.auth"].to_yaml
  end
  alias_method :foursquare, :all
end
