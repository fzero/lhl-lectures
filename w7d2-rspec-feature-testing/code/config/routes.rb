Rails.application.routes.draw do
  root controller: :bicycles, action: :index
  resources :bicycles, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
