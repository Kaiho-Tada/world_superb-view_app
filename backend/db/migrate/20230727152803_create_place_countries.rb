class CreatePlaceCountries < ActiveRecord::Migration[6.1]
  def change
    create_table :place_countries do |t|
      t.references :place, null: false, foreign_key: true
      t.references :country, null: false, foreign_key: true

      t.timestamps
    end
  end
end
