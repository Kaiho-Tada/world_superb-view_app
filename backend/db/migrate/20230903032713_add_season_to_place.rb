class AddSeasonToPlace < ActiveRecord::Migration[6.1]
  def change
    add_column :places, :season, :string
  end
end
