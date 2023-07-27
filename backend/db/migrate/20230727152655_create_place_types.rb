class CreatePlaceTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :place_types do |t|
      t.references :place, null: false, foreign_key: true
      t.references :type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
