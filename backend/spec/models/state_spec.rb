require 'rails_helper'

RSpec.describe State, type: :model do
  describe "バリデーションテスト" do
    it "nameが存在すれば保存されること" do
      expect(build(:state)).to be_valid
    end

    it "nameがなければ無効な状態であること" do
      state = build(:state, name: nil)
      state.valid?
      expect(state.errors[:name]).to include("can't be blank")
    end

    it "nameは最大で50文字であること" do
      state = build(:state, name: "a" * 51)
      state.valid?
      expect(state.errors[:name]).to include("is too long (maximum is 50 characters)")
    end
  end
end
