class Video < ActiveRecord::Base
  belongs_to :user

  validates :name, presence: true
  validates :source_url, presence: true

  has_many :markers
end