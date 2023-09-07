class PlaceCountry < ApplicationRecord
  belongs_to :place
  belongs_to :country

  validates :place_id, presence: true
  validates :country_id, presence: true
end
