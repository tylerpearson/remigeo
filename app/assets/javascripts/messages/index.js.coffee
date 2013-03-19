$('.messages.index').ready ->

  console.log "message index page"

  if $('#map').length

    m = mapbox.map('map').zoom(4).center({ lat: 39.870, lon: -98.759 })
    m.addLayer(mapbox.layer().id('tylerpearson.map-3dokdyu1'))

    markerLayer = mapbox.markers.layer()
    mapbox.markers.interaction(markerLayer)
    m.addLayer(markerLayer)

    for marker in gon.messages

      markerLayer.add_feature
        geometry:
          coordinates: [marker.longitude, marker.latitude]

      properties:
        "marker-color": "#168187"
        "marker-symbol": "post"
        title: marker.name
        description: marker.messages[0].content

      console.log marker

    m.ui.attribution.add()
        .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>')