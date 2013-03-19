$('.new_message').ready ->

  console.log "new message form"

  $('#message_content').css('overflow', 'hidden').autogrow()

  unless navigator.geolocation
    alert "This site requires geolocation to work."
  else
    navigator.geolocation.getCurrentPosition ((position) ->

      $('#location-search').on 'keyup change input blur paste focus', (e) ->

        searchQuery = $('#location-search').val()

        if searchQuery.length > 2
          $('#search-locations-results').fadeIn()
          searchLocations(searchQuery,position.coords.latitude,position.coords.longitude)

    ), (err) ->

      alert "This site requires geolocation to work."



# search locations
searchLocations = (name,lat,long) ->

  apiDate = 20130318

  foursquareClientId     = "DHICGNZEQLALXKHTWVSQPBRJPDAUSSTP5U1WAHDT5YAUITUL"
  foursquareClientSecret = "QJJOUTWQ2RBIMQJ3ED3RWZBIDGG4ZLEXK3LJQSM3LGU4KOON"

  searchQuery = "https://api.foursquare.com/v2/venues/suggestcompletion?ll=#{lat},#{long}&query=#{name}&client_id=#{foursquareClientId}&client_secret=#{foursquareClientSecret}&v=#{apiDate}&limit=50"

  $.getJSON searchQuery, (data) ->

    locations = []

    $.each data['response']['minivenues'], (key, val) ->
      if val.location.address
        locations.push "<option value=\"#{val.id}\">#{val.name} (#{val.location.address}, #{val.location.city})</option>"
      else
        locations.push "<option value=\"#{val.id}\">#{val.name} (#{val.location.city})</option>"

    $locations = $("#search-locations-results")
    $locations.html('')

    success:

      $(locations.join("")).appendTo($locations)