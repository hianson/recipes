Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/home" => "home#index"

  resources :recipes
  resources :users, only: [:create]
end
