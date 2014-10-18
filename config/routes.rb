Rails.application.routes.draw do

  namespace :api do
    resources :videos, only: [:show]
  end

  scope module: :web do
    root 'welcome#index'

    resources :user_sessions, only: [:new, :create, :destroy]
    resources :users

    get 'login' => 'user_sessions#new', :as => :login
    post 'logout' => 'user_sessions#destroy', :as => :logout

    scope module: :account do
      resources :videos
    end
  end

end
