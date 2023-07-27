class Place < ApplicationRecord
  has_one_attached :portrait

  has_many :place_genres
  has_many :genres, through: :place_genres
  has_many :place_types
  has_many :types, through: :place_types
  has_many :place_countries
  has_many :countries, through :place_countries
end
