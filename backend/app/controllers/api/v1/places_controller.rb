class Api::V1::PlacesController < ApplicationController
  def index
    # render json: Place.all.to_json(include: [:country, :genres, :types], methods: [:image_url])
    render json: Place.all.to_json(include: [:countries], methods: [:image_url])
  end
end
