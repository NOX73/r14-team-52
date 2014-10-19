CarrierWave.configure do |config|

  if Rails.env.production?
    config.fog_credentials = {
      :provider              => 'AWS',
      :aws_access_key_id     => ENV['S3_KEY'],
      :aws_secret_access_key => ENV['S3_SECRET'],
      :region                => ENV['S3_REGION']
    }

    config.storage = :fog

    config.fog_directory    = ENV['S3_BUCKET_NAME']
    # config.s3_access_policy = :public_read                          # Generate http:// urls. Defaults to :authenticated_read (https://)
    # config.fog_host         = "#{ENV['S3_ASSET_URL']}/#{ENV['S3_BUCKET_NAME']}"
  else
    config.storage = :file
    if Rails.env.test?
      config.enable_processing = false
      config.root = "#{Rails.root}/tmp"
    end
  end

  config.cache_dir = "#{Rails.root}/tmp/uploads"                  # To let CarrierWave work on heroku
end
