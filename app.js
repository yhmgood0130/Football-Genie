$(document).ready(function() {


  $("#sub").click(function(){
    $('.container')[0].style.backgroundColor = "#fff";
    var team = "";
    team = $("#search").val();
    console.log(team);
    var img = document.createElement("img");
    img.setAttribute("id", "logo")

    // $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + team, function(data) {
    //   //console.log("Team Manager: " + data.teams[0].strManager);
    //   img.src = data.teams[0].strTeamBadge;
    //   $('body').append("Team Manager: " + data.teams[0].strManager);
    //   $('body').append(img);
    // });
    // $(".row")[1].append("Chelsea");

    $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t="  + team, function(data) {
      for (var i = 0; i < data.player.length; i++) {
        var img = document.createElement("img");
        img.setAttribute("id", "logo")

        // console.log("Team Players: " + data.player[i].strPlayer);
        if(!data.player[i].strCutout){
          img.src = "/bean.jpg";
        }
        else{
          img.src = data.player[i].strCutout;
        }
        $("#row2").append($("<p>Player Name: " + data.player[i].strPlayer + "</p>"));
        // $(".row")[1].append("Player Name: " + data.player[i].strPlayer);
        // $(".row")[1].append("Nationality: " + data.player[i].strNationality);
        // $(".row")[1].append("Number: " + data.player[i].intSoccerXMLTeamID);
        // $(".row")[1].append(img);
      }
    });
    //Initializng and loading the map
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {
        lat: -34.397,
        lng: 150.644
      }
    });
    var geocoder = new google.maps.Geocoder();


    geocodeAddress(geocoder, map);

    function geocodeAddress(geocoder, resultsMap) {
      var address = "Stamford Bridge";
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

  })



});
