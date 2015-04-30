/* INIT */
var lat 			= '';
var lng 			= '';
var hash 			= ''; 
var feeling			= '';
var finalWeather 	= '';

/* WEATHER TYPES */

// Bad Weather
var badWeather 		= new Array(5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,35,40,41,42,43,46,47);

// Best Weather
var bestWeather 	= new Array(20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,36,44);

// Weather Type
var weather_types = new Array('terrible','not good','best');

// DECISION VARIABLES
var decision 	= new Array();
decision[0]		= new Array();
decision[1] 	= new Array();
decision[2] 	= new Array();

// Stressed
decision[0][0] = new Array('do pushups','meditate','do jumping jacks');
decision[0][1]	= new Array('Gym','Pub','Art Museum');
decision[0][2] = new Array('Thai Restaurant','Indian Restaurant','Movie Theater');

// Excited
decision[1][0] = new Array('Dance','Sing','Drink');
decision[1][1]	= new Array('Movies','Bar','Bowling');
decision[1][2] = new Array('Park','Outdoor Tennis Courts','Golf Course');

// Tired
decision[2][0] = new Array('sleep','watch TV','browse Internet');
decision[2][1]	= new Array('Spa','Yoga','Museum');
decision[2][2] = new Array('Cafe','Starbucks','Italian Restaurant');

var feeling_arr = new Array('stressed','excited','tired');

/* GENERAL FUNCTIONS */

function getHashValue(key) {
  return location.hash.match(new RegExp(key+'=([^&]*)'))[1];
}

function convertGeneralWeather(weatherCode) {
	var bew = bestWeather.indexOf(parseInt(weatherCode));
	var baw = badWeather.indexOf(parseInt(weatherCode));

	finalWeather = 0;

	if (baw!=-1) finalWeather = 1;
	if (bew!=-1) finalWeather = 2;
}

/* DECISION MAKER */
function makeDecision() {
	var randomPick = Math.floor(Math.random()*3);
	var finalDecision = window.decision[window.feeling][window.finalWeather][randomPick];

	var answer = '<center><img src=\"img/guy.png\" height=\"100px\"></center><br />';
	

	asnwer = "<p>I know you are "+window.feeling_arr[window.feeling]+".<br />";
	answer += "With the "+weather_types[window.finalWeather]+" weather for now,<br />I suggest you should ";

	if (window.finalWeather==1 || window.finalWeather==2) answer += "go to ";
	
	answer += finalDecision;
	answer += '</p>';
	if (window.finalWeather!=0) answer+='<button style="margin-top:30px;" onclick="window.location.href=\'find.html#decision='+finalDecision+'&lat='+window.lat+'&lng='+window.lng+'\';" class="btn btn-info">Want to know a good place?</button>';

	$('#oursolution').html('<h1 align="center">'+answer+'</h1>');
}

/* LOCATION */
function dontKnowLocation() {
	finalWeather = 0;
	makeDecision();
}
 
function foundLocation(position) {

	feeling = getHashValue('feeling');

	lat = position.coords.latitude;
	lng = position.coords.longitude;

	$.simpleWeather({
		location 	: lat+','+lng, 
		unit		: 'f',
		success		: function(weather) {
			convertGeneralWeather(weather.code);
			makeDecision(window.finalWeather,window.feeling);
		}
	});

}

function ourSolution() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(foundLocation,dontKnowLocation);   
	} else {
		dontKnowLocation();
	}
}