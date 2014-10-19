require 'rails_helper'

RSpec.describe Api::VideosController, :type => :controller do

  let(:valid_attributes) {
    {name: 'Test', source_url: 'http://youtu.be/aSvZEyQT52k' }
  }

  describe "GET show" do
    it "assigns the requested video as @video" do
      video = Video.create! valid_attributes
      get :show, {:id => video.to_param}
      expect(assigns(:video)).to eq(video)
    end
  end

end
