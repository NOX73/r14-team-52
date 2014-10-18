class Video::MarkerSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :type_of_marker, :link, :start_at, :x, :y
end
