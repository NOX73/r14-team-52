class Video::Marker < ActiveRecord::Base
  belongs_to :video

  # enum type_of_marker: {info: 0, link: 1}

  validates :name, presence: true
  validates :start_at, presence: true
  validates :x, presence: true
  validates :y, presence: true
end
