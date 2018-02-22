Rails.application.routes.draw do

  root to: 'bicycles#index'
  resources :bicycles, only: [:index, :show]
  resources :styles, only: [:show]

  # resources :styles, only: [:show] do
  #   resources :bicycles, only: [:index, :show]
  # end
end
