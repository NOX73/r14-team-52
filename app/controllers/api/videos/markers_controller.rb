class Api::Videos::MarkersController < Api::Videos::ApplicationController

  def index
    @markers = resource_video.markers
  end

  def show
    @marker = resource_video.markers.find(params[:id])
  end

  def create
    @marker = resource_video.markers.build
    @marker.update_attributes(video_marker_params)
    @marker
  end

  def update
    @marker = resource_video.markers.find(params[:id])
    @marker.update_attributes(video_marker_params)
  end

  def destroy
    @marker = resource_video.markers.find(params[:id])
    @marker.destroy
  end

  private

    def video_marker_params
      params.require(:video_marker).permit(:name, :image, :description, :type_of_marker, :link, :start_at, :x, :y)
    end
end
