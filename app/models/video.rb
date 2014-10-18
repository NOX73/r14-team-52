class Video < ActiveRecord::Base
  belongs_to :user

  validates :name, presence: true
  validates :youtube_video_id, presence: true

  has_many :markers
end
