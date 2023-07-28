class Place < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :portrait

  has_many :place_genres
  has_many :genres, through: :place_genres
  has_many :place_types
  has_many :types, through: :place_types
  has_many :place_countries
  has_many :countries, through: :place_countries

  def image_url
    url_for(portrait)
  end
end
