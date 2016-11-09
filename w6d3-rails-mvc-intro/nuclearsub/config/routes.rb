Rails.application.routes.draw do
  resources :ingredients
  resources :sandwiches, only: [:index]

  # get '/sandwich', controller: 'sandwiches', action: 'index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
