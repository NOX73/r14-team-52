project_home = ENV['UNICORN_HOME'] || '.'
working_directory project_home

worker_processes (ENV['UNICORN_WORKERS'] || 1).to_i

listen ENV['APP_ROOT'] + '/shared/.sock', backlog: 64
timeout (ENV['UNICORN_TIMEOUT'] || 40).to_i

pid ENV['APP_ROOT'] + '/shared/pids/unicorn.pid'

# combine REE with "preload_app true" for memory savings
# http://rubyenterpriseedition.com/faq.html#adapt_apps_for_cow
preload_app true

GC.respond_to?(:copy_on_write_friendly=) and
  GC.copy_on_write_friendly = true

before_fork do |server, worker|
  # Disconnect since the database connection will not carry over
  if defined? ActiveRecord::Base
    ActiveRecord::Base.connection.disconnect!
  end

  if defined?(Resque)
    Resque.redis.quit
    Rails.logger.info('Disconnected from Redis')
  end
end

after_fork do |server, worker|
  # Start up the database connection again in the worker
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
  end

  if defined?(Resque)
    Resque.redis = ENV['REDIS_URI']
    Rails.logger.info('Connected to Redis')
  end
end
