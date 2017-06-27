$(document).ready(function() {


  $("#sub").click(function(){
    $("div#row2").empty();
    $('.container')[0].style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    var team = "";
    team = $("#search").val();
    //console.log(team);

    // $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + team, function(data) {
    //   //console.log("Team Manager: " + data.teams[0].strManager);
    //   img.src = data.teams[0].strTeamBadge;
    //   $('body').append("Team Manager: " + data.teams[0].strManager);
    //   $('body').append(img);
    // });
    // $(".row")[1].append("Chelsea");

    // $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchteams.php?t="  + team, function(data) {
    //
    //   if(data.teams[0].strTeamBanner){
    //     $("div#row2").append($("<img src=" + data.teams[0].strTeamBanner + " id='team-info'>").width("70%").height("70%"))
    //     $("div#row2").append($("<h3>Banner</h3>"))
    //   }
    //
    //   if(data.teams[0].strTeamBadge){
    //     $("div#row2").append($("<img src=" + data.teams[0].strTeamBadge + " id='team-info'>").width("20%").height("20%"))
    //     $("div#row2").append($("<h3>Badge</h3>"))
    //     $("div#row2").append($("<img src=" + data.teams[0].strTeamJersey + " id='team-info'>").width("20%").height("20%"))
    //     $("div#row2").append($("<h3>Uniform</h3>"))
    //   }
    //
    //   if(data.teams[0].strStadiumThumb){
    //     $("div#row2").append($("<img src=" + data.teams[0].strStadiumThumb + " id='team-info'>").width("70%").height("70%"))
    //     $("div#row2").append($("<p>Name of Stadium: " + data.teams[0].strStadium + "</p>"))
    //     $("div#row2").append($("<p>Location: " + data.teams[0].strStadiumLocation + "</p>"))
    //     $("div#row2").append($("<p>Number of Capacity: " + data.teams[0].intStadiumCapacity + "</p>"))
    //   }
    //
    //   var address = data.teams[0].strStadiumLocation;
    //
    //   //Initializng and loading the map
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 8,
    //     center: {
    //       lat: -34.397,
    //       lng: 150.644
    //     }
    //   });
    //   var geocoder = new google.maps.Geocoder();
    //
    //   geocodeAddress(geocoder, map);
    //
    //   function geocodeAddress(geocoder, resultsMap) {
    //     var address = data.teams[0].strStadiumLocation;
    //     geocoder.geocode({
    //       'address': address
    //     }, function(results, status) {
    //       if (status === 'OK') {
    //         resultsMap.setCenter(results[0].geometry.location);
    //         var marker = new google.maps.Marker({
    //           map: resultsMap,
    //           position: results[0].geometry.location
    //         });
    //       } else {
    //         alert('Geocode was not successful for the following reason: ' + status);
    //       }
    //     });
    //   }
    // });

    // Find the players by team

    $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t="  + team, function(data) {

      //$("div#row2").empty();
      for (var i = 0; i < data.player.length; i++) {

        $("div#row2").append($('<div class="col-md-4" id=' + i + '></div>'));
        // var img = "<img>"


        // console.log("Team Players: " + data.player[i].strPlayer);
        if(!data.player[i].strCutout){
          $("#" + i + ".col-md-4").append($("<img src= /bean.jpg >"));
        }
        else{
          $("#" + i + ".col-md-4").append($("<img src=" + data.player[i].strCutout + ">"));
        }
        $("#" + i + ".col-md-4").append($("<p>" + data.player[i].strPlayer + "</p>"));
        $("#" + i + ".col-md-4").append($("<p>Nationality: " + data.player[i].strNationality + "</p>"));
        $("#" + i + ".col-md-4").append($("<p>Number: " + data.player[i].intSoccerXMLTeamID + "</p>"));
      }
    });


  })



});
