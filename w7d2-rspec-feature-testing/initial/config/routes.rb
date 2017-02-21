Rails.application.routes.draw do

  root to: 'bicycles#index'
  resources :bicycles, only: [:index]

end
