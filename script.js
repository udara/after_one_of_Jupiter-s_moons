var lat, lon;
var apikey ='5e799cbc4834793851ed4eb3fbe95228';
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
    $('#lat').text(lat);
    $('#lon').text(lon);
    info(lat,lon);
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


function info(lat, lon){

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid='+apikey;
    $.ajax({
          url: queryURL,
          method: "GET",
          success: function(response){
            var result = response;

            console.log(result)
            $('#temp').text(result.main.temp)
            $('#wspd').text(result.wind.speed)       
          },
          error: function(){
            var msg = "City Not found";
            console.log(msg);
          }

})
}