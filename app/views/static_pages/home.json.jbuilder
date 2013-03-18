json.array!(@locations) do |location|
  json.geometry do
    json.type "Point"
    json.coordinates [location.latitude, location.longitude]
  end
  json.id location.id
  json.name location.title
  json.foursquare_venue_id location.foursquare_location_id
  json.latitude location.latitude
  json.longitude location.longitude
  json.updated_at location.updated_at
  json.messages location.messages, :content, :created_at, :updated_at
end