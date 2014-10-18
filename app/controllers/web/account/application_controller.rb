class Web::Account::ApplicationController < Web::ApplicationController
  before_filter :require_login
end
