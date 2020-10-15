Rails.application.routes.draw do
  get '/users/online', to: 'users#get_online_users'
  resources :users do 
    resources :appearances, only: [ :create, :update]
  end
  resources :appearances, only: :index
  
  mount ActionCable.server => '/cable'

  resources :users do 
    resources :friendship
  end

  
  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
