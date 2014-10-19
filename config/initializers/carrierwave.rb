CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',                        # required
    :aws_access_key_id      => ENV.fetch('AWS_ACCESS_KEY'),                        # required
    :aws_secret_access_key  => ENV.fetch('AWS_SECRET_ACCESS_KEY'),                        # required
    :region                 => ENV.fetch('AWS_REGION'),                  # optional, defaults to 'us-east-1'
    :host                   => 's3.example.com',             # optional, defaults to nil
    :endpoint               => 'https://s3.example.com:8080' # optional, defaults to nil
  }
  config.fog_directory  = 'markers'                          # required
  config.fog_public     = false                                        # optional, defaults to true
  config.fog_attributes = {'Cache-Control'=>"max-age=#{365.day.to_i}"} # optional, defaults to {}
end
