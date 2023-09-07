require 'rails_helper'

RSpec.describe Country, type: :model do
  describe "バリデーションテスト" do
    it "name,stateオブジェクトが存在すれば保存されること" do
      state = create(:state)
      # binding.pry
      # country = create(:country)
      expect(create(:country, state: create(:state))).to be_valid
    end

    it "nameがなければ無効な状態であること" do
      country = build(:country, name: nil)
      country.valid?
      expect(country.errors[:name]).to include("can't be blank")
    end

    it "stateオブジェクトがなければ無効な状態であること" do
      country = build(:country, state: nil)
      country.valid?
      expect(country.errors[:state]).to include("must exist")
    end

    it "nameは最大で50文字であること" do
      country = build(:country, name: "a" * 51)
      country.valid?
      expect(country.errors[:name]).to include("is too long (maximum is 50 characters)")
    end
  end

  describe "スコープテスト" do
    it "フィルター文字列に一致する国を返すこと" do
      country1 = create(:country, name: "エジプト")
      country2 = create(:country, name: "モロッコ")
      expect(Country.filter_country("エジプト")).to include(country1)
      expect(Country.filter_country("モロッコ")).to include(country2)
    end

    it "引数に渡されたrisk_levelに一致する国を返すこと" do
      country1 = create(:country, name: "エジプト", risk_level: 0)
      country2 = create(:country, name: "モロッコ", risk_level: 1)
      expect(Country.filter_country_by_risk_level(0)).to include(country1)
      expect(Country.filter_country_by_risk_level(1)).to include(country2)
    end
  end
end
