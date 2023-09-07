require 'rails_helper'

RSpec.describe "Genres", type: :request do
  describe "GET api/v1/genres" do

    it "ジャンルが全件取得できていること" do
      create_list(:genre, 10)
      get api_v1_genres_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(10)
      # binding.pry
    end

    it "関連placeが取得できること" do
      place1 = create(:place, name: "サハラ砂漠")
      place2 = create(:place, name: "蘆笛岩")
      place3 = create(:place, name: "ワイトモ洞窟")
      genre_desert = create(:genre, name: "砂漠")
      genre_cave = create(:genre, name: "洞窟")
      create(:place_genre, place: place1, genre: genre_desert)
      create(:place_genre, place: place2, genre: genre_cave)
      create(:place_genre, place: place3, genre: genre_cave)

      get api_v1_genres_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      json.each do |genre_object|
        genre = Genre.find_by(name: genre_object["name"])
        genre.places.each do |place|
          expect(genre_object["places"].to_s).to include(place.name)
        end
      end
    end
  end
end
