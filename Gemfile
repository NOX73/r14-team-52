source "https://rubygems.org"

ruby "2.1.2"

gem "airbrake"
gem "high_voltage"
gem "i18n-tasks"
gem "jquery-rails"
gem "normalize-rails", "~> 3.0.0"
gem "pg"
gem "rack-timeout"
gem "rails", "4.1.6"
gem "recipient_interceptor"
gem "haml-rails"
gem "sass-rails", "~> 4.0.3"
gem "simple_form"
gem "title"
gem "uglifier"
gem "unicorn"
gem "therubyracer"
gem "less-rails"
gem "twitter-bootstrap-rails"

group :development do
  gem "spring"
end

group :development, :test do
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_girl_rails"
  gem "rspec-rails"
end

group :test do
  gem "capybara-webkit", ">= 1.2.0"
  gem "database_cleaner"
  gem "webmock"
end

group :staging, :production do
  gem 'rails_12factor'
  gem "newrelic_rpm", ">= 3.7.3"
end
