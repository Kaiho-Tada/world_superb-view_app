require 'rails_helper'

RSpec.describe "Types", type: :request do
  describe "GET api/v1/types" do
    it "タイプが全件取得できていること" do
      create_list(:type, 10)
      get api_v1_types_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(10)
    end

    it "関連placeが取得できること" do
      place1 = create(:place, name: "サルベーションマウンテン")
      place2 = create(:place, name: "万里の長城")
      place3 = create(:place, name: "スワローズネスト")
      type_healing = create(:type, name: "癒し")
      type_historic = create(:type, name: "歴史・文化的")

      create(:place_type, place: place1, type: type_healing)
      create(:place_type, place: place2, type: type_historic)
      create(:place_type, place: place3, type: type_historic)

      get api_v1_types_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      json.each do |type_object|
        type = Type.find_by(name: type_object["name"])
        type.places.each do |place|
          binding.pry
          expect(type_object["places"].to_s).to include(place.name)
        end
      end
    end
  end
end
