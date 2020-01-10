Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resources :users, only: [:show, :update] do
      resources :posts, only: [:create, :index]
      resources :friendships, only: [:show, :create, :index]
    end
    resources :posts, only: [:update, :show, :destroy] do
      collection do
        get :newsfeed
      end
      resources :comments, only: [:create, :index]
    end
    resources :comments, only: [:update, :destroy]
    resources :friendships, only: [:update, :destroy]
    resource :session, only: [:create, :destroy, :show]
  end

  get :search, controller: :main
  
  root "static_pages#root"
end