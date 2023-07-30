class Genre < ApplicationRecord
  has_many :place_genres
  has_many :places, through: :place_genres

  scope :filter_genre, lambda { |names|
    where(name: [*names])
  }
end
