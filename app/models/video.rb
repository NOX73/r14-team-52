require "uri"
require "cgi"

class YoutubeVideoIdValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if !value || value.empty?
      record.errors[:source_url] << (options[:message] || "Please provide correct YouTube url")
    end
  end
end

class Video < ActiveRecord::Base
  belongs_to :user
  has_many :markers

  validates :name, :source_url, presence: true
  validates :source_url, url: true
  validates :youtube_video_id, youtube_video_id: true

  def source_url=(value)
    write_attribute(:source_url, value)
    self.youtube_video_id = extract_youtube_video_id_from(value)
  end

  private

    def extract_youtube_video_id_from(value)
      url = URI.parse(value)
      if url.query
        CGI.parse(url.query)["v"].first
      else
        url.path[1..-1]
      end
    end
end
