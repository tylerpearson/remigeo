$('.new_message').ready ->

  console.log "new message form"

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

  d = new Date()
  currentDate = d.yyyymmdd()

  foursquareClientId     = "DHICGNZEQLALXKHTWVSQPBRJPDAUSSTP5U1WAHDT5YAUITUL"
  foursquareClientSecret = "QJJOUTWQ2RBIMQJ3ED3RWZBIDGG4ZLEXK3LJQSM3LGU4KOON"

  searchQuery = "https://api.foursquare.com/v2/venues/suggestcompletion?ll=#{lat},#{long}&query=#{name}&client_id=#{foursquareClientId}&client_secret=#{foursquareClientSecret}&v=#{currentDate}&limit=50"

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

# the date
Date::yyyymmdd = ->
  yyyy = @getFullYear().toString()
  mm = (@getMonth() + 1).toString()
  dd = @getDate().toString()
  yyyy + ((if mm[1] then mm else "0" + mm[0])) + ((if dd[1] then dd else "0" + dd[0]))