require 'rails_helper'

RSpec.describe Web::UserSessionsController, :type => :controller do

  let(:create_user) {
    create :user
  }

  let(:valid_credentials) {
    attributes_for :user
  }

  let(:invalid_credentials) {
    {email: 'test1@test.com', password: ''}
  }

  describe "GET new" do
    it "returns http success" do
      get :new
      expect(response).to be_success
    end
  end

  describe "GET create" do

    describe "with valid credentials" do
      it "redirects to the videos list" do
        create_user
        post :create, user: valid_credentials
        expect(response).to redirect_to(videos_url)
      end
    end

    describe "with invalid credentials" do
      it "re-renders the 'new' template" do
        create_user
        post :create, user: invalid_credentials
        expect(response).to render_template("new")
      end
    end
  end

  describe "GET destroy" do
    it "redirects to the root page" do
      user = create_user
      login_user(user)
      delete :destroy
      expect(response).to redirect_to(root_url)
    end
  end

end
