json.geometry do
  json.type "Point"
  json.coordinates [@message.location.latitude, @message.location.longitude]
end
json.id @message.location.id
json.name @message.location.title
json.foursquare_venue_id @message.location.foursquare_location_id
json.latitude @message.location.latitude
json.longitude @message.location.longitude
json.updated_at @message.updated_at
json.content @message.content