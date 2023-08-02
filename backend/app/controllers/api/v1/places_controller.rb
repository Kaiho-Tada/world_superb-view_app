class Api::V1::PlacesController < ApplicationController
  def index
    render json: Place.all.to_json(include: [:countries], methods: [:image_url])
  end

  def search
    places = Place.all
                  .filter_by_keyword(place_params[:keyword])
                  .filter_by_genre(place_params[:genre_names])
                  .filter_by_country(place_params[:country_names])
                  .filter_by_type(place_params[:type_names])
                  .distinct
    render json: places.to_json(include: [:countries], methods: [:image_url])
  end

  def place_params
    # params.permit(genre_names: [], country_names: [], type_names: [], :keyword)
    params.permit(:keyword, genre_names: [], country_names: [], type_names: [])
  end
end
