class Api::VideosController < Api::ApplicationController
  def show
    @video = Video.find(params[:id])
    render json: @video
  end
end
