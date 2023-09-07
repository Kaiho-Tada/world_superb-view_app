class AddRiskLevelToCountries < ActiveRecord::Migration[6.1]
  def change
    add_column :countries, :risk_level, :integer
  end
end
