$(".home").ready ->

  console.log "we are on the home page"

  m = mapbox.map('home-map').zoom(2).center({ lat: 39.870, lon: -98.759 })
  m.addLayer(mapbox.layer().id('examples.map-vyofok3q'))

  markerLayer = mapbox.markers.layer()
  m.addLayer(markerLayer)

  unless navigator.geolocation
    alert "This site requires geolocation to work."
  else
    navigator.geolocation.getCurrentPosition ((position) ->

      m.zoom(13).center
        lat: position.coords.latitude
        lon: position.coords.longitude

      markerLayer.add_feature
         geometry:
           coordinates: [position.coords.longitude, position.coords.latitude]

         properties:
          "marker-color": "#168187"
          "marker-symbol": "star-stroked"


    ), (err) ->

      alert "This site requires geolocation to work."