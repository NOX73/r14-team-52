class CreateUserVideos < ActiveRecord::Migration
  def change
    create_table :user_videos do |t|
      t.string :name
      t.string :source_url
      t.references :user, index: true

      t.timestamps
    end
  end
end
