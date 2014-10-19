class AddSourceUrlToVideos < ActiveRecord::Migration
  def change
    add_column :videos, :source_url, :string
  end
end
