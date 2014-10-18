require 'rails_helper'

RSpec.describe Web::UserSessionsController, :type => :controller do

  describe "GET new" do
    it "returns http success" do
      get :new
      expect(response).to be_success
    end
  end

  describe "GET create" do

    describe "with valid credentials" do
      it "redirects to the videos list" do
        user = create :user, password: '123'
        post :create, user: {email: user.email, password: '123'}
        expect(response).to redirect_to(videos_url)
      end
    end

    describe "with invalid credentials" do
      it "re-renders the 'new' template" do
        user = create :user, password: '123'
        post :create, user: {email: user.email, password: '456'}
        expect(response).to render_template("new")
      end
    end
  end

  describe "GET destroy" do
    it "redirects to the root page" do
      user = create :user
      login_user(user)
      delete :destroy
      expect(response).to redirect_to(root_url)
    end
  end

end
