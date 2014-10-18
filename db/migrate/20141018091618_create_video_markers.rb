class CreateVideoMarkers < ActiveRecord::Migration
  def change
    create_table :video_markers do |t|
      t.string :name
      t.string :image
      t.string :description
      t.integer :type
      t.string :link
      t.timestamp :start_at
      t.integer :x
      t.integer :y
      t.references :video, index: true

      t.timestamps
    end
  end
end
