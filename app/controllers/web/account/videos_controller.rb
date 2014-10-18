class Web::Account::VideosController < Web::Account::ApplicationController

  # GET /videos
  def index
    @videos = User::Video.all
  end

  # GET /videos/1
  def show
    @video = User::Video.find(params[:id])
  end

  # GET /videos/new
  def new
    @video = User::Video.new
  end

  # GET /videos/1/edit
  def edit
    @video = User::Video.find(params[:id])
  end

  # POST /videos
  def create
    @video = User::Video.new(video_params)
    @video.user = current_user

    if @video.save
      redirect_to video_url(@video), notice: 'Video was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /videos/1
  def update
    @video = User::Video.find(params[:id])
    if @video.update(video_params)
      redirect_to video_url(@video), notice: 'Video was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /videos/1
  def destroy
    @video = User::Video.find(params[:id])
    @video.destroy
    redirect_to videos_url, notice: 'Video was successfully destroyed.'
  end

  private

    def video_params
      params.require(:user_video).permit(:name, :source_url)
    end
end
