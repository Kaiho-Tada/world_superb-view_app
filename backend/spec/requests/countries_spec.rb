require 'rails_helper'

RSpec.describe "Countries", type: :request do
  describe "GET api/v1/countries" do
    it "カントリーが全件取得できていること" do
      create_list(:country, 10)
      get api_v1_countries_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json.length).to eq(10)
    end

    it "関連placeが取得できること" do
      place1 = create(:place, name: "蘆笛岩")
      place2 = create(:place, name: "万里の長城")
      place3 = create(:place, name: "モニュメントバレー")
      country_china = create(:country, name: "中国")
      country_america = create(:country, name: "アメリカ")

      create(:place_country, place: place1, country: country_china)
      create(:place_country, place: place2, country: country_china)
      create(:place_country, place: place3, country: country_america)

      get api_v1_countries_path
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      json.each do |country_object|
        country = Country.find_by(name: country_object["name"])
        country.places.each do |place|
          # binding.pry
          expect(country_object["places"].to_s).to include(place.name)
        end
      end
    end
  end
end
