class Api::Videos::ApplicationController < Api::ApplicationController

  protected

  def resource_video
    Video.find(params[:video_id])
  end
end
