class Country < ApplicationRecord
  belongs_to :state
  has_many :place_countries
  has_many :places, through: :place_countries

  # validates :name, presence: true
  validates :name, length: { maximum: 50 }, presence: true
  validates :state_id, presence: true

  scope :filter_country, lambda { |names|
    where(name: [*names])
  }

  scope :filter_country_by_risk_level, ->(risk_levels) do
    # where(risk_levels: risk_levels)
    where(risk_level: [*risk_levels])
  end

  # scope :sort_country_by_risk_level, -> {
  #   order(risk_level: :asc)
  # }

  # scope :sort_by_risk_level, -> {
  #   order(risk_level: :asc)
  # }
end
