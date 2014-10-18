require 'rails_helper'

RSpec.describe Web::Account::VideosController, :type => :controller do

  let(:user) {
    attributes = {email: 'test1@test.com', password: '123', password_confirmation: '123'}
    User.create! attributes
  }

  before do
    login_user(user)
  end

  let(:valid_attributes) {
    {name: 'Test', source_url: 'https://www.youtube.com/watch?v=n_yHZ_vKjno' }
  }

  let(:invalid_attributes) {
    {name: 'Test', source_url: ''}
  }

  let(:valid_session) { {} }

  describe "GET index" do
    it "assigns all videos as @videos" do
      video = Video.create! valid_attributes
      get :index, {}, valid_session
      expect(assigns(:videos)).to eq([video])
    end
  end

  describe "GET show" do
    it "assigns the requested video as @video" do
      video = Video.create! valid_attributes
      get :show, {:id => video.to_param}, valid_session
      expect(assigns(:video)).to eq(video)
    end
  end

  describe "GET new" do
    it "assigns a new video as @video" do
      get :new, {}, valid_session
      expect(assigns(:video)).to be_a_new(Video)
    end
  end

  describe "GET edit" do
    it "assigns the requested video as @video" do
      video = Video.create! valid_attributes
      get :edit, {:id => video.to_param}, valid_session
      expect(assigns(:video)).to eq(video)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Video" do
        expect {
          post :create, {:video => valid_attributes}, valid_session
        }.to change(Video, :count).by(1)
      end

      it "assigns a newly created video as @video" do
        post :create, {:video => valid_attributes}, valid_session
        expect(assigns(:video)).to be_a(Video)
        expect(assigns(:video)).to be_persisted
      end

      it "redirects to the created video" do
        post :create, {:video => valid_attributes}, valid_session
        expect(response).to redirect_to(video_url(Video.last))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved video as @video" do
        post :create, {:video => invalid_attributes}, valid_session
        expect(assigns(:video)).to be_a_new(Video)
      end

      it "re-renders the 'new' template" do
        post :create, {:video => invalid_attributes}, valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      let(:new_attributes) {
        {name: 'Test', source_url: 'https://www.youtube.com/watch?v=n_yHZ_vKjno'}
      }

      it "updates the requested video" do
        video = Video.create! valid_attributes
        put :update, {:id => video.to_param, :video => new_attributes}, valid_session
        video.reload

        expect(video.name).to eq('Test')
      end

      it "assigns the requested video as @video" do
        video = Video.create! valid_attributes
        put :update, {:id => video.to_param, :video => valid_attributes}, valid_session
        expect(assigns(:video)).to eq(video)
      end

      it "redirects to the video" do
        video = Video.create! valid_attributes
        put :update, {:id => video.to_param, :video => valid_attributes}, valid_session
        expect(response).to redirect_to(video_url(video))
      end
    end

    describe "with invalid params" do
      it "assigns the video as @video" do
        video = Video.create! valid_attributes
        put :update, {:id => video.to_param, :video => invalid_attributes}, valid_session
        expect(assigns(:video)).to eq(video)
      end

      it "re-renders the 'edit' template" do
        video = Video.create! valid_attributes
        put :update, {:id => video.to_param, :video => invalid_attributes}, valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested video" do
      video = Video.create! valid_attributes
      expect {
        delete :destroy, {:id => video.to_param}, valid_session
      }.to change(Video, :count).by(-1)
    end

    it "redirects to the videos list" do
      video = Video.create! valid_attributes
      delete :destroy, {:id => video.to_param}, valid_session
      expect(response).to redirect_to(videos_url)
    end
  end

end
