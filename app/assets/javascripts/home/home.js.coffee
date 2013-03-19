$(".home").ready ->

  console.log "home page"

  if $('#home-map').length

    m = mapbox.map('home-map').zoom(2).center({ lat: 39.870, lon: -98.759 })
    m.addLayer(mapbox.layer().id('tylerpearson.map-1simeiyt'))

    markerLayer = mapbox.markers.layer()
    mapbox.markers.interaction(markerLayer)
    m.addLayer(markerLayer)

    unless navigator.geolocation
      alert "This site requires geolocation to work."
    else
      navigator.geolocation.getCurrentPosition ((position) ->

        console.log "Current location: #{position.coords.latitude}, #{position.coords.longitude}"

        m.zoom(13).center
          lat: position.coords.latitude
          lon: position.coords.longitude


        for marker in gon.messages

          markerLayer.add_feature
             geometry:
               coordinates: [marker.longitude, marker.latitude]

             properties:
              "marker-color": "#168187"
              "marker-symbol": "post"
              title: marker.name
              description: marker.messages[0].content

      ), (err) ->

        alert "This site requires geolocation to work."

    m.ui.attribution.add()
        .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>')