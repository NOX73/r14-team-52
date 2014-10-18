class RenameSourceUrlToYoutubeVideoIdVideos < ActiveRecord::Migration
  def change
    rename_column :videos, :source_url, :youtube_video_id
  end
end
