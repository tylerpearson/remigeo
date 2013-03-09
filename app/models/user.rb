class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :provider, :uid
  # attr_accessible :title, :body

  has_many :messages, :dependent => :destroy
  has_many :locations, :through => :messages


  def self.find_for_foursquare_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(email: auth.extra.raw_info.contact.email,
                          provider: auth.provider,
                          uid: auth.uid,
                          password: Devise.friendly_token[0,20]
                        )
    end
    user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.foursquare_data"] && session["devise.foursquare_data"]["extra"]["raw_info"]
        user.email = data["contact"]["email"] if user.email.blank?
      end
    end
  end


end
