class Api::Videos::MarkersController < Api::Videos::ApplicationController

  def index
    @markers = resource_video.markers
    render json: @markers
  end

  def show
    @marker = resource_video.markers.find(params[:id])
    render json: @marker
  end

  def create
    @marker = resource_video.markers.build
    @marker.update_attributes(video_marker_params)
    render json: @marker
  end

  def update
    @marker = resource_video.markers.find(params[:id])
    @marker.update_attributes(video_marker_params)
    render json: @marker
  end

  def destroy
    @marker = resource_video.markers.find(params[:id])
    @marker.destroy
    render json: @marker
  end

  private

    def video_marker_params
      params.require(:video_marker).permit(:name, :image, :description, :type_of_marker, :link, :start_at, :x, :y)
    end
end
