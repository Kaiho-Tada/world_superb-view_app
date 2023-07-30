class Country < ApplicationRecord
  belongs_to :state
  has_many :place_countries
  has_many :places, through: :place_countries

  scope :filter_country, lambda { |names|
    where(name: [*names])
  }
end
