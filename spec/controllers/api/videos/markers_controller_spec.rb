require 'rails_helper'

RSpec.describe Api::Videos::MarkersController, :type => :controller do

  let(:valid_attributes) {
    attributes_for(:video_marker)
  }

  let(:invalid_attributes) {
    {name: 'Test', type: 4, x: 0, y: 0}
  }

  let(:user) { create :user }
  let(:video) { create :video, user: user }

  describe "GET index" do
    it "assigns all markers as @markers" do
      marker = create :video_marker, video: video
      get :index, {video_id: video.to_param}
      expect(assigns(:markers)).to eq([marker])
    end
  end

  describe "GET show" do
    it "assigns the requested marker as @marker" do
      marker = create :video_marker, video: video
      get :show, {video_id: video.to_param, id: marker.to_param}
      expect(assigns(:marker)).to eq(marker)
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested marker" do
      marker = create :video_marker, video: video
      expect {
        delete :destroy, {video_id: video.to_param, id: marker.to_param}
      }.to change(Video::Marker, :count).by(-1)
    end
  end
end
