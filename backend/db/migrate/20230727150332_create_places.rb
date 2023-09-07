class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.string :name, null: false
      t.string :panorama_url

      t.timestamps
    end
  end
end
