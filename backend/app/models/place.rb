class Place < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_one_attached :portrait

  has_many :place_genres
  has_many :genres, through: :place_genres
  has_many :place_types
  has_many :types, through: :place_types
  has_many :place_countries
  has_many :countries, through: :place_countries

  validates :name, length: { maximum: 50 }, presence: true
  validate :validate_image

  def validate_image
    if portrait.attached? == false
      errors.add(:portrait, "画像データが存在しません")
    end
  end

  scope :filter_by_genre, lambda { |names|
    return self if names.blank?

    genres = Genre
             .all
             .filter_genre(names)
    # binding.pry
    genre_ids = genres&.map { |genre| genre.id }&.join(',')
    # binding.pry

    joins(:genres).where("genres.id IN (#{genre_ids})").distinct
  }

  scope :filter_by_country, lambda { |names|
    return self if names.blank?

    countries = Country
                .all
                .filter_country(names)

    country_ids = countries.map { |country| country.id }.join(',')
    joins(:countries).where("countries.id IN (#{country_ids})").distinct
  }

  scope :filter_by_type, lambda { |names|
    return self if names.blank?

    types = Type
            .all
            .filter_type(names)

    type_ids = types.map { |type| type.id }.join(',')
    joins(:types).where("types.id IN (#{type_ids})").distinct
  }

  # scope :filter_by_keyword, ->(keyword) do
  #   return self if keyword.blank?
  #   joins(:genres)
  #   .joins(:countries)
  #   # .joins(:types)
  #   .where('places.name LIKE(?)',"%#{keyword}%")
  # end

  # scope :filter_by_keyword, ->(keyword) do
  #   return self if keyword.blank?
  #   joins(:countries)
  #   .where('places.name LIKE(?)',"%#{keyword}%")
  # end

  scope :filter_by_keyword, ->(keyword) do
    return self if keyword.blank?
    joins(:countries)
    .where('places.name LIKE(?) or countries.name LIKE(?)',"%#{keyword}%","%#{keyword}%")
  end

  scope :filter_place_by_risk_level, ->(risk_levels) do
    # return self if risk_level == "5"
    return self if risk_levels.blank?

    countries = Country
                .all
                .filter_country_by_risk_level(risk_levels)

    country_ids = countries.map { |country| country.id }.join(',')
    joins(:countries).where("countries.id IN (#{country_ids})").distinct
  end

  # scope :sort_by_risk_level, -> do
  #   joins(:countries).order("countries.risk_level ASC")
  # end

  # scope :filter_place_by_seasons, ->(seasons_names) do
  #   # return self if risk_level == "5"
  #   return self if seasons_names.blank?

  #   seasons_names.each do |season|
  #     if season == "春"
  #       where(season: "1", "2", "3")
  #     end
  #   end
  # end

  def image_url
    url_for(portrait)
  end
end
