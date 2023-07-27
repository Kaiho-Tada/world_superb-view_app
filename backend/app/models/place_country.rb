class PlaceCountry < ApplicationRecord
  belongs_to :place
  belongs_to :country
end
