class Web::WelcomeController < Web::ApplicationController
  def index
    @last_videos = Video.latest.take(3)
  end
end
