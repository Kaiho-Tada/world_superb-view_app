class Genre < ApplicationRecord
  has_many :place_genres
  has_many :places, through: :place_genres

  validates :name, length: { maximum: 50 }, presence: true
  validates :category, length: { maximum: 50 }, presence: true

  scope :filter_genre, lambda { |names|
    where(name: [*names])
  }
end
