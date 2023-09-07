class PlaceType < ApplicationRecord
  belongs_to :place
  belongs_to :type
end
