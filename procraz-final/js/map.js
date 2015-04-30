var map;
var infowindow;

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
    var request = {
    	reference: results[0].reference
  	};
  	var service = new google.maps.places.PlacesService(map);

  	service.getDetails(request, function(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    	createMarker(place);
    }
  	});
  } 
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