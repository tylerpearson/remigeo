class Message < ActiveRecord::Base
  attr_accessible :content, :location_id, :user_id, :visible

  default_scope order: 'created_at DESC'

  belongs_to :user
  belongs_to :location

  validates :content, presence: true
  validates :user_id, presence: true
  validates :location_id, presence: true

  before_create :make_visible

  private

    def make_visible
      self.visible = true
    end

end
