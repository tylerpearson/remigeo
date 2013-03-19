$(".messages.show").ready ->

  console.log "show message page"

  if $('#map').length

    m = mapbox.map('map').zoom(2).center({ lat: 39.870, lon: -98.759 })
    m.addLayer(mapbox.layer().id('tylerpearson.map-3dokdyu1'))

    markerLayer = mapbox.markers.layer()
    mapbox.markers.interaction(markerLayer)
    m.addLayer(markerLayer)

    m.zoom(14).center
      lat: gon.message.latitude
      lon: gon.message.longitude

    markerLayer.add_feature
      geometry:
        coordinates: [gon.message.longitude, gon.message.latitude]

      properties:
        "marker-color": "#168187"
        "marker-symbol": "post"
        title: gon.message.name
        description: gon.message.content

    m.ui.attribution.add()
        .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');