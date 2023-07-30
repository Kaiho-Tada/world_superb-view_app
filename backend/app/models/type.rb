class Type < ApplicationRecord
  has_many :place_types
  has_many :places, through: :place_types

  scope :filter_type, lambda { |names|
    where(name: [*names])
  }
end
