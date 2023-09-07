class State < ApplicationRecord
  has_many :countries

  validates :name, length: { maximum: 50 }, presence: true
end
