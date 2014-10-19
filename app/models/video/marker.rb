class Video::Marker < ActiveRecord::Base
  LINK = 1
  INFO = 2

  belongs_to :video

  after_initialize :init

  validates :start_at, presence: true
  validates :x, presence: true
  validates :y, presence: true

  def init
    self.type_of_marker ||= LINK
  end
end
