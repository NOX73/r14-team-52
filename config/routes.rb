Rails.application.routes.draw do

  get 'oauths/oauth'

  get 'oauths/callback'

  namespace :api do
    resources :videos, only: [:show] do
      scope module: :videos do
        resources :markers
      end
    end
  end

  scope module: :web do
    root 'welcome#index'

    resources :user_sessions, only: [:new, :create, :destroy]
    resources :users

    scope module: :account do
      resources :videos
    end

    # internal auth
    get 'login' => 'user_sessions#new', :as => :login
    post 'logout' => 'user_sessions#destroy', :as => :logout

    # external auth
    post "oauth/callback" => "oauths#callback"
    get "oauth/callback" => "oauths#callback" # for use with Github, Facebook
    get "oauth/:provider" => "oauths#oauth", :as => :auth_at_provider
  end

end
