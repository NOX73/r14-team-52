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
    @marker = resource_video.markers.build(video_marker_params)
    if @marker.save
      render json: @marker
    else
      render json: @marker, status: :unprocessable_entity
    end
  end

  def update
    @marker = resource_video.markers.find(params[:id])
    if @marker.update(video_marker_params)
      render json: @marker
    else
      render json: @marker, status: :unprocessable_entity
    end
  end

  def destroy
    @marker = resource_video.markers.find(params[:id])
    @marker.destroy
    render json: nil, status: :no_content
  end

  private

    def video_marker_params
      params.require(:video_marker).permit(:name, :image, :description, :type_of_marker, :link, :start_at, :x, :y)
    end
end
