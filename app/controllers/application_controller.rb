class ApplicationController < ActionController::Base
  protect_from_forgery

  def stored_location_for(resource)
    if current_user && session[:return_to]
      flash[:notice] = "All set! You're logged in."
      return session[:return_to]
    end
    super( resource )
  end

end
