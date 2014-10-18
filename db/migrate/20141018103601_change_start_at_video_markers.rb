class ChangeStartAtVideoMarkers < ActiveRecord::Migration
  def change
    remove_column :video_markers, :start_at
    add_column :video_markers, :start_at, :integer
  end
end
