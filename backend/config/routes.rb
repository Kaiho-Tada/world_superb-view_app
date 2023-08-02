Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end

      resources :places, :only => [:index]
      get "/places/search", to: "places#search"

      resources :genres, :only => [:index]
      resources :countries, :only => [:index]
      resources :types, :only => [:index]

    end
  end
end
