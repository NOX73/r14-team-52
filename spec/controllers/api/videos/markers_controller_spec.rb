require 'rails_helper'

RSpec.describe Api::Videos::MarkersController, :type => :controller do

  let(:valid_attributes) { attributes_for(:video_marker) }

  let(:invalid_attributes) {
    {name: 'Test', type_of_marker: 4, x: 0, y: 0}
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

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Video::Marker" do
        expect {
          post :create, {video_id: video.to_param, :video_marker => valid_attributes}
        }.to change(Video::Marker, :count).by(1)
      end

      it "assigns a newly created marker as @marker" do
        post :create, {video_id: video.to_param, :video_marker => valid_attributes}
        expect(assigns(:marker)).to be_a(Video::Marker)
        expect(assigns(:marker)).to be_persisted
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved marker as @marker" do
        post :create, {video_id: video.to_param, :video_marker => invalid_attributes}
        expect(assigns(:marker)).to be_a_new(Video::Marker)
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      let(:new_attributes) { attributes_for(:video_marker) }

      it "updates the requested marker" do
        marker = create :video_marker, video: video
        put :update, {video_id: video.to_param, :id => marker.to_param, :video_marker => new_attributes}
        marker.reload

        expect(marker.name).to eq(new_attributes[:name])
      end

      it "assigns the requested marker as @marker" do
        marker = create :video_marker, video: video
        put :update, {video_id: video.to_param, :id => marker.to_param, :video_marker => valid_attributes}
        expect(assigns(:marker)).to eq(marker)
      end
    end

    describe "with invalid params" do
      it "assigns the marker as @marker" do
        marker = create :video_marker, video: video
        put :update, {video_id: video.to_param, :id => marker.to_param, :video_marker => invalid_attributes}
        expect(assigns(:marker)).to eq(marker)
      end
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
