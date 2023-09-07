require 'rails_helper'

RSpec.describe Type, type: :model do
  describe "バリデーションテスト" do
    it "nameが存在すれば保存されること" do
      expect(create(:type)).to be_valid
    end

    it "nameがなければ無効な状態であること" do
      type = build(:type, name: nil)
      type.valid?
      expect(type.errors[:name]).to include("can't be blank")
    end

    it "nameは最大で50文字であること" do
      type = build(:type, name: "a" * 51)
      type.valid?
      expect(type.errors[:name]).to include("is too long (maximum is 50 characters)")
    end
  end

  describe "スコープテスト" do
    it "フィルター文字列に一致した属性を返すこと" do
      type1 = create(:type, name: "ロマンチック")
      type2 = create(:type, name: "幻想的")
      expect(Type.filter_type("ロマンチック")).to include(type1)
      expect(Type.filter_type("幻想的")).to include(type2)
    end
  end
end
