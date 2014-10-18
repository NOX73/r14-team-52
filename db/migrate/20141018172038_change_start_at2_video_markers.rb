class ChangeStartAt2VideoMarkers < ActiveRecord::Migration
  def change
    change_column :video_markers, :start_at, :float
  end
end
