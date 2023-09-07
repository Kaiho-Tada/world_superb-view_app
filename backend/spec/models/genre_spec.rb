require 'rails_helper'

RSpec.describe Genre, type: :model do
  describe "バリデーションテスト" do
    it "name,categoryが存在すれば保存されること" do
      expect(create(:genre)).to be_valid
    end

    it "nameがなければ無効な状態であること" do
      genre = build(:genre, name: nil)
      genre.valid?
      expect(genre.errors[:name]).to include("can't be blank")
    end

    it "categoryがなければ無効な状態であること" do
      genre = build(:genre, category: nil)
      genre.valid?
      expect(genre.errors[:category]).to include("can't be blank")
    end

    it "nameは最大で50文字であること" do
      genre = build(:genre, name: "a" * 51)
      genre.valid?
      expect(genre.errors[:name]).to include("is too long (maximum is 50 characters)")
    end
  end

  describe "スコープテスト" do
    it "フィルター文字列に一致したジャンルを返すこと" do
      genre1 = create(:genre, name: "滝")
      genre2 = create(:genre, name: "山")
      expect(Genre.filter_genre("滝")).to include(genre1)
      expect(Genre.filter_genre("山")).to include(genre2)
    end
  end
end
