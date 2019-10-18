Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create]
    resources :users, only: [:show, :update] do
      resources :posts, only: [:show, :create, :index]
      resources :friendships, only: [:show, :create, :index]
    end
    resources :friendships, only: [:update, :destroy]
    resource :session, only: [:create, :destroy, :show]
  end
  
  root "static_pages#root"
end