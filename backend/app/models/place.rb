class Place < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :portrait

  has_many :place_genres
  has_many :genres, through: :place_genres
  has_many :place_types
  has_many :types, through: :place_types
  has_many :place_countries
  has_many :countries, through: :place_countries

  scope :filter_by_genre, lambda { |names|
    return self if names.blank?

    genres = Genre
             .all
             .filter_genre(names)

    genre_ids = genres&.map { |genre| genre.id }&.join(',')
    joins(:genres).where("genres.id IN (#{genre_ids})")
  }

  scope :filter_by_country, lambda { |names|
    return self if names.blank?

    countries = Country
                .all
                .filter_country(names)

    country_ids = countries.map { |country| country.id }.join(',')
    joins(:countries).where("countries.id IN (#{country_ids})")
  }

  scope :filter_by_type, lambda { |names|
    return self if names.blank?

    types = Type
            .all
            .filter_type(names)

    type_ids = types.map { |type| type.id }.join(',')
    joins(:types).where("types.id IN (#{type_ids})")
  }

  def image_url
    url_for(portrait)
  end
end
