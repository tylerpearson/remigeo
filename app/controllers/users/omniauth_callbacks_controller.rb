class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  skip_before_filter :verify_authenticity_token

  def passthru
    render :file => "#{Rails.root}/public/404.html", :status => 404, :layout => false
  end

  def foursquare

    auth = request.env["omniauth.auth"]

    authentication = Authentication.find_by_provider_and_uid(auth['provider'], auth['uid'])


    @user = User.find_for_foursquare_oauth(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
      set_flash_message(:notice, :success, :kind => "Foursquare")
    else
      session["devise.foursquare_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

end
