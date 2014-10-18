class Web::Account::VideosController < Web::Account::ApplicationController

  # GET /videos
  def index
    @videos = Video.all
  end

  # GET /videos/1
  def show
    @video = Video.find(params[:id])
  end

  # GET /videos/new
  def new
    @video = Video.new
  end

  # GET /videos/1/edit
  def edit
    @video = Video.find(params[:id])
  end

  # POST /videos
  def create
    @video = Video.new(video_params)
    @video.user = current_user

    if @video.save
      redirect_to video_url(@video), notice: 'Video was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /videos/1
  def update
    @video = Video.find(params[:id])
    if @video.update(video_params)
      redirect_to video_url(@video), notice: 'Video was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /videos/1
  def destroy
    @video = Video.find(params[:id])
    @video.destroy
    redirect_to videos_url, notice: 'Video was successfully destroyed.'
  end

  private

    def video_params
      params.require(:video).permit(:name, :source_url)
    end
end