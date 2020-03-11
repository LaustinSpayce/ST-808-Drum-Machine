Rails.application.routes.draw do
  resources :songs
  get 'machine/machine'
  root to: 'machine#machine'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
