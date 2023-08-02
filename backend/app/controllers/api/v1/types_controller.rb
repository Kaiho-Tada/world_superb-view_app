class Api::V1::TypesController < ApplicationController
  def index
    render json: Type.all.to_json(include: [:places])
  end
end
