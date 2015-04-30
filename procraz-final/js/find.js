var map;
var infowindow;

/* Get Near By the lat & lng with Google Place */
// Type
var types = new Array();
types['restaurant'] 	= new Array('Thai Restaurant','Indian Restaurant','Italian Restaurant');
types['cafe']			= new Array('Cafe','Starbucks');
types['movie_theater']	= new Array('Movies');
types['gym']			= new Array('Gym');
types['park']			= new Array('Park');
types['museum']			= new Array('Art Museum');
types['beach']			= new Array('Beach'); 

// Get Variable Values
var lat 				= getHashValue('lat');
var lng 				= getHashValue('lng');
var finalDecision 	= getHashValue('decision');

function getHashValue(key) {
  return location.hash.match(new RegExp(key+'=([^&]*)'))[1];
}

function initialize() {
  var yourarea = new google.maps.LatLng(window.lat, window.lng);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: yourarea,
    zoom: 15
  });

  var request = {
    location: yourarea,
    radius: 5000,
    keyword: window.finalDecision
  };

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    /* for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      $('#search_result').html(results[i].reference);
    } */
    var request = {
    	reference: results[0].reference
  	};
  	var service = new google.maps.places.PlacesService(map);

  	service.getDetails(request, function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    	createMarker(place);
    	$('#search_result').html('<h1 align="center"><img src="img/found.png" height="100px"><br />So we will go to <br />'+place.name+'</h1><center><p>'+place.formatted_address+'</p><button type="button" style="margin-top:30px;" onclick="window.location.href=\'map.html#decision='+window.finalDecision+'&lat='+window.lat+'&lng='+window.lng+'\';" class="btn btn-info">Show me the map</button></center>');
    }
  	});
  } else $('#search_result').html('<h1 align="center">Sorry. We can\'t find any '+window.finalDecision+' in this area</h1>');
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  map.setCenter(marker.getPosition());

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name+'<br />'+place.formatted_address);
    infowindow.open(map, this);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);