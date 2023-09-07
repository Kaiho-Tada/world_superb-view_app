class AddDetailsToCountries < ActiveRecord::Migration[6.1]
  def change
    add_column :countries, :code, :integer
    add_column :countries, :risk_level, :integer
  end
end
