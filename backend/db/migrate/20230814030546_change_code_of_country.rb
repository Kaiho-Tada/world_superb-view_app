class ChangeCodeOfCountry < ActiveRecord::Migration[6.1]
  def up
    change_column :countries, :code, :string
  end

  def down
    change_column :countries, :code, :string
  end
end
