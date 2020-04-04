console.log("test");

var lat = -34.962764;

var log = 138.526134;

// function initMap() {
//     var Latlog = new google.maps.LatLng(lat, log);
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 30, center: Latlog, mapTypeId: 'satellite'});
//     var marker = new google.maps.Marker({position: Latlog, map: map});
// }


function initMap() {
    var Latlog = new google.maps.LatLng(lat, log);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 30, center: Latlog,
      mapTypeId: 'satellite'
    });


    map.addListener('click', function(e) {
        console.log("click");
        placeMarkerAndPanTo(e.latLng, map);
    });


    function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    }
};