require 'rails_helper'

RSpec.describe Api::VideosController, :type => :controller do

  let(:valid_attributes) {
    {name: 'Test', youtube_video_id: 'v=n_yHZ_vKjno' }
  }

  describe "GET show" do
    it "assigns the requested video as @video" do
      video = Video.create! valid_attributes
      get :show, {:id => video.to_param}
      expect(assigns(:video)).to eq(video)
    end
  end

end
