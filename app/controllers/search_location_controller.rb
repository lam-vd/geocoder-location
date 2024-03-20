class SearchLocationController < ApplicationController
  def create
    # Access lat and log params set from frontend
    latitude = params[:latitude]
    longitude = params[:longitude]
    # Logic
    location_data = Geocoder.search([latitude, longitude])

    render json: location_data.first.data
  end
end
