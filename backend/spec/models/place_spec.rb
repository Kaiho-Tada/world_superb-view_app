require 'rails_helper'

RSpec.describe Place, type: :model do
  describe "バリデーションのテスト" do

    # before do
    #   @place = build(:place)
    #   @place.portrait = fixture_file_upload("/files/test_image.avif")
    #   binding.pry
    # end

    it "name,画像データが存在すれば保存されること" do
      expect(build(:place)).to be_valid
    end

    it "nameがなければ無効な状態であること" do
      place = build(:place, name: nil)
      # binding.pry
      place.valid?
      expect(place.errors[:name]).to include("can't be blank")
    end

    it "画像データがなければ無効な状態であること" do
      place = build(:place, portrait: nil)
      place.valid?
      expect(place.errors[:portrait]).to include("画像データが存在しません")
    end

    it "nameは最大で50文字であること" do
      place = build(:place, name: "a" * 51)
      place.valid?
      expect(place.errors[:name]).to include("is too long (maximum is 50 characters)")
    end
  end

  describe "スコープのテスト" do
    let!(:place1) {create(:place, name: "マテーラの洞窟住居")}
    let!(:place2) {create(:place, name: "チヴィタディバニョレージョ")}
    let!(:place3) {create(:place, name: "マチュピチュ")}

    it "filter_genre文字列に一致したジャンルを持つPalceを返すこと" do
      genre_cave = create(:genre, name: "洞窟")
      genre_city = create(:genre, name: "都市")
      # binding.pry
      create(:place_genre, place: place1, genre: genre_cave)
      create(:place_genre, place: place2, genre: genre_city)
      create(:place_genre, place: place3, genre: genre_city)
      expect(Place.filter_by_genre(genre_cave.name)).to include(place1)
      expect(Place.filter_by_genre(genre_city.name)).to include(place2, place3)
    end

    it "filter_country文字列に一致した国を持つPalceを返すこと" do
      country_italy = create(:country, name: "イタリア")
      country_peru = create(:country, name: "ペルー")
      create(:place_country, place: place1, country: country_italy)
      create(:place_country, place: place2, country: country_italy)
      create(:place_country, place: place3, country: country_peru)
      expect(Place.filter_by_country(country_italy.name)).to include(place1, place2)
      expect(Place.filter_by_country(country_peru.name)).to include(place3)
    end

    it "filter_type文字列に一致したタイプを持つPalceを返すこと" do
      type_historic = create(:type, name: "歴史・文化的")
      type_fantasy = create(:type, name: "幻想・神秘的")
      create(:place_type, place: place1, type: type_historic)
      create(:place_type, place: place2, type: type_fantasy)
      create(:place_type, place: place3, type: type_historic)
      expect(Place.filter_by_type(type_historic.name)).to include(place1, place3)
      expect(Place.filter_by_type(type_fantasy.name)).to include(place2)
    end

    it "keyword文字列に一致したname,genre,country,typeを持つPlaceを返すこと" do
      genre_cave = create(:genre, name: "洞窟")
      country_italy = create(:country, name: "イタリア")
      type_historic = create(:type, name: "歴史・文化的")
      create(:place_genre, place: place1, genre: genre_cave)
      create(:place_country, place: place1, country: country_italy)
      create(:place_type, place: place1, type: type_historic)
      expect(Place.filter_by_keyword(place1.name)).to include(place1)
      expect(Place.filter_by_keyword(genre_cave.name)).to include(place1)
      expect(Place.filter_by_keyword(country_italy.name)).to include(place1)
      expect(Place.filter_by_keyword(type_historic.name)).to include(place1)
    end

    it "引数に渡されたrisk_levelに一致する国を持つPlaceを返すこと" do
      country_italy = create(:country, name: "イタリア", risk_level: 0)
      country_peru = create(:country, name: "ペルー", risk_level: 1)
      create(:place_country, place: place1, country: country_italy)
      create(:place_country, place: place2, country: country_italy)
      create(:place_country, place: place3, country: country_peru)
      expect(Place.filter_by_risk_level(0)).to include(place1, place2)
      expect(Place.filter_by_risk_level(1)).to include(place3)
    end
  end
end

describe "インスタンスメソッドのテスト" do
  let!(:place) {create(:place)}

  it "image_urlメソッドで生成されるurlが意図した形式になっていること" do
    # binding.pry
    # expect(place.image_url).to eq "/http:\/\/localhost:3001\/rails\/active_storage\/blobs\/redirect\/.+\/test_image.jpg/"
    expect(place.image_url).to match(/http:\/\/localhost:3001\/rails\/active_storage\/blobs\/redirect\/.+\/test_image.jpg/)
    # expect(place.image_url).to match(http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWNCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--06bfd4c974f13c21f6f4e1698266357052eb45be/test_image.jpg)
  end
end
