class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :provider, :uid
  # attr_accessible :title, :body

  has_many :authentications, :dependent => :destroy

  has_many :messages, :dependent => :destroy
  has_many :locations, :through => :messages

  has_many :checkins

  def apply_omniauth(auth)
    # In previous omniauth, 'user_info' was used in place of 'raw_info'
    self.email = auth['extra']['raw_info']["contact"]["email"]
    # Again, saving token is optional. If you haven't created the column in authentications table, this will fail
    authentications.build(:provider => auth['provider'], :uid => auth['uid'], :token => auth['credentials']['token'])
  end


end
