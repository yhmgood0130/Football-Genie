$(document).ready(function() {


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {
      lat: -34.397,
      lng: 150.644
    }
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });


  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  var team = 'chelsea'
  var img = document.createElement("img");
  img.setAttribute("id", "logo")

  $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + team, function(data) {
    console.log("Team Manager: " + data.teams[0].strManager);
    img.src = data.teams[0].strTeamBadge;
    $('body').before("Team Manager: " + data.teams[0].strManager);
    $('body').before(img);
    console.log(data);
  });



});
