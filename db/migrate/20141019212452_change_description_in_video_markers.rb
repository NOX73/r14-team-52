class ChangeDescriptionInVideoMarkers < ActiveRecord::Migration
  def change
    change_column :video_markers, :description, :text
  end
end
