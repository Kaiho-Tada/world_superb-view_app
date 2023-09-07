class Api::V1::GenresController < ApplicationController
  def index
    render json: Genre.all.to_json(include: [:places])
  end
end
