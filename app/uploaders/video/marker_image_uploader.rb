# encoding: utf-8

class Video::MarkerImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  process :resize_to_fill => [28, 28]

  def extension_white_list
    %w(jpg jpeg gif png)
  end

end
