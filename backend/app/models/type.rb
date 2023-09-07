class Type < ApplicationRecord
  has_many :place_types
  has_many :places, through: :place_types

  validates :name, length: { maximum: 50 }, presence: true

  scope :filter_type, lambda { |names|
    where(name: [*names])
  }
end
