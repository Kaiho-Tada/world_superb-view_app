require 'rails_helper'

RSpec.describe "Places", type: :request do
  describe "GET api/v1/places" do
    let!(:place1) {create(:place, name: "蘆笛岩")}
    let!(:place2) {create(:place, name: "万里の長城")}
    let!(:place3) {create(:place, name: "モニュメントバレー")}

    before do
      get api_v1_places_path
      @json = JSON.parse(response.body)
    end

    it "placeが全件取得できていること" do
      expect(response).to have_http_status(200)
      expect(@json.length).to eq(3)
    end

    describe "オプションのテスト" do
      let!(:country_china) {create(:country, name: "中国")}
      let!(:country_america) {create(:country, name: "アメリカ")}
      # create(:place_country, place: place1, country: country_china)
      # create(:place_country, place: place2, country: country_china)
      # create(:place_country, place: place3, country: country_america)

      # before do
      #   get api_v1_places_path
      #   @json = JSON.parse(response.body)
      # end

      it "関連countryが取得できること" do
        create(:place_country, place: place1, country: country_china)
        create(:place_country, place: place2, country: country_china)
        create(:place_country, place: place3, country: country_america)
        get api_v1_places_path
        @json = JSON.parse(response.body)
        expect(response).to have_http_status(200)
        @json.each do |place_object|
          place = Place.find_by(name: place_object["name"])
          place.countries.each do |country|
            # binding.pry
            expect(place_object["countries"].to_s).to include(country.name)
          end
        end
      end

      it "メソッドオプションでimage_urlが取得できること" do
        expect(response).to have_http_status(200)
        @json.each do |place_object|
          place = Place.find_by(name: place_object["name"])
          # binding.pry
          expect(place_object["image_url"]).to eq place.image_url
        end
      end
    end
  end

  describe "GET api/v1/places/search" do
    let!(:place1) {create(:place, name: "マテーラの洞窟住居")}
    let!(:place2) {create(:place, name: "チヴィタディバニョレージョ")}
    let!(:place3) {create(:place, name: "マチュピチュ")}
    # let!(:genre_city) {create(:genre, name: "都市")}
    # let!(:genre_cave) {create(:genre, name: "洞窟")}

    describe "filter_by_genreメソッドのテスト" do
      let!(:genre_city) {create(:genre, name: "都市")}
      let!(:genre_cave) {create(:genre, name: "洞窟")}
      before do
        create(:place_genre, place: place1, genre: genre_cave)
        create(:place_genre, place: place2, genre: genre_city)
        create(:place_genre, place: place3, genre: genre_city)
      end

      it "paramsで渡されたgenre.nameに一致するジャンル名を持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          genre_names: [ genre_city.name ]
        }
        # json = JSON.parse(response.body)
        # binding.pry
        expect(response).to have_http_status(200)
        expect(response.body).to include(place2.name, place3.name)
        # expect(json).to include(place2, place3)
      end

      it "返されるplaceが重複しないこと" do
        create(:place_genre, place: place2, genre: genre_cave)
        get api_v1_places_search_path, params: {
          genre_names: [ genre_city.name, genre_cave.name ]
        }
        json = JSON.parse(response.body)
        # binding.pry
        expect(response).to have_http_status(200)
        expect(json.uniq).to eq json
      end
    end

    describe "filter_by_countryメソッドのテスト" do
      let!(:country_italy) {create(:country, name: "イタリア")}
      let!(:country_peru) {create(:country, name: "ペルー")}
      before do
        create(:place_country, place: place1, country: country_italy)
        create(:place_country, place: place2, country: country_italy)
        create(:place_country, place: place3, country: country_peru)
      end

      it "paramsで渡されたcountry.nameに一致する国名を持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          country_names: [ country_italy.name ]
        }
        expect(response).to have_http_status(200)
        expect(response.body).to include(place1.name, place2.name)
      end

      it "返されるplaceが重複しないこと" do
        create(:place_country, place: place3, country: country_italy)
        get api_v1_places_search_path, params: {
          country_names: [ country_italy.name, country_peru.name ]
        }
        json = JSON.parse(response.body)
        # binding.pry
        expect(response).to have_http_status(200)
        expect(json.uniq).to eq json
      end
    end

    describe "filter_by_typeメソッドのテスト" do
      let!(:type_historic) {create(:type, name: "歴史・文化的")}
      let!(:type_fantasy) {create(:type, name: "幻想・神秘的")}

      before do
        create(:place_type, place: place1, type: type_fantasy)
        create(:place_type, place: place2, type: type_historic)
        create(:place_type, place: place3, type: type_historic)
      end

      it "paramsで渡されたtype.nameに一致する属性を持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          type_names: [ type_historic.name ]
        }
        expect(response).to have_http_status(200)
        expect(response.body).to include(place2.name, place3.name)
      end

      it "返されるplaceが重複しないこと" do
        create(:place_type, place: place1, type: type_historic)
        get api_v1_places_search_path, params: {
          type_names: [ type_fantasy.name, type_historic.name ]
        }
        json = JSON.parse(response.body)
        # binding.pry
        expect(response).to have_http_status(200)
        expect(json.uniq).to eq json
      end
    end

    describe "filter_by_keywordメソッドのテスト" do
      # let!(:genre_city) {create(:genre, name: "都市")}
      let!(:genre_cave) {create(:genre, name: "洞窟")}
      let!(:country_italy) {create(:country, name: "イタリア")}
      # let!(:country_peru) {create(:country, name: "ペルー")}
      # let!(:type_historic) {create(:type, name: "歴史・文化的")}
      let!(:type_fantasy) {create(:type, name: "幻想・神秘的")}
      before do
        create(:place_genre, place: place1, genre: genre_cave)
        # create(:place_genre, place: place2, genre: genre_city)
        # create(:place_genre, place: place3, genre: genre_city)
        create(:place_country, place: place1, country: country_italy)
        # create(:place_country, place: place2, country: country_italy)
        # create(:place_country, place: place3, country: country_peru)
        create(:place_type, place: place1, type: type_fantasy)
        # create(:place_type, place: place2, type: type_historic)
        # create(:place_type, place: place3, type: type_historic)
      end
      it "paramsで渡されたkeywordに一致する名前を持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          keyword: place1.name
        }
        expect(response).to have_http_status(200)
        expect(response.body).to include(place1.name)
      end

      it "paramsで渡されたkeywordに一致するジャンルを持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          keyword: place1.genres[0].name
        }
        expect(response).to have_http_status(200)
        expect(response.body).to include(place1.name)
      end

      it "paramsで渡されたkeywordに一致する国名を持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          keyword: place1.countries[0].name
        }
        expect(response).to have_http_status(200)
        expect(response.body).to include(place1.name)
      end

      it "paramsで渡されたkeywordに一致するタイプを持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          keyword: place1.types[0].name
        }
        expect(response).to have_http_status(200)
        expect(response.body).to include(place1.name)
      end
    end

    describe "filter_by_risk_levelメソッドのテスト" do
      let!(:country_italy) {create(:country, name: "イタリア", risk_level: 0)}
      let!(:country_peru) {create(:country, name: "ペルー", risk_level: 1)}

      before do
        create(:place_country, place: place1, country: country_italy)
        create(:place_country, place: place2, country: country_italy)
        create(:place_country, place: place3, country: country_peru)
      end
      it "paramsで渡されたrisk_levelの値に一致する国を持つplaceを返すこと" do
        get api_v1_places_search_path, params: {
          risk_level: 0
        }
        expect(response).to have_http_status(200)
        # binding.pry
        expect(response.body).to include(place1.name, place2.name)
      end
    end
  end
end
