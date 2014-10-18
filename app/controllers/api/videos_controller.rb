class Api::VideosController < Api::ApplicationController
  def show
    @video = Video.find(params[:id])
  end
end
