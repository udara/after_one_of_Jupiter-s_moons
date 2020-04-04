var lat, lon;

var options = {
enableHighAccuracy:true,
timeout: 5000,
maximumAge:0
};

navigator.geolocation.getCurrentPosition(success,error,options);

function success(pos){
lat = pos.coords.latitude;
lon = pos.coords.longitude;
console.log("Latitude = " + lat + " " + "Longitude = " + lon);
}

function error(error){
    switch(error.code) {
        case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
        break;
        case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
        break;
        case error.TIMEOUT:
        console.log("The request to get user location timed out.")
        break;
        case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
        break;
    }
}

function getWeather(lat,lon)
{
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
}