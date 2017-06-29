$(document).ready(function() {
  $(document).on('click', '.nav-list li', function() {
         $(".nav-list li").removeClass("active");
         $(this).addClass("active");
  });

  $("#sub").click(function() {
    $("div#row2").empty();
    $("#map").empty();
    $('.container')[0].style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    var result = '';
    var type = '';

    result = $("#search").val();
    type = $("#choice").val();
    console.log(result);


    if (type == 'team') {
      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + result, function(data) {

        if (data.teams[0].strTeamBanner) {
          $("div#row2").append($("<img src=" + data.teams[0].strTeamBanner + " id='team-info'>").width("70%").height("70%"))
          $("div#row2").append($("<h3>Banner</h3>"))
        }

        if (data.teams[0].strTeamBadge) {
          $("div#row2").append($("<img src=" + data.teams[0].strTeamBadge + " id='team-info'>").width("20%").height("20%"))
          $("div#row2").append($("<h3>Badge</h3>"))
          $("div#row2").append($("<img src=" + data.teams[0].strTeamJersey + " id='team-info'>").width("20%").height("20%"))
          $("div#row2").append($("<h3>Uniform</h3>"))
        }

        if (data.teams[0].strStadiumThumb) {
          $("div#row2").append($("<img src=" + data.teams[0].strStadiumThumb + " id='team-info'>").width("70%").height("70%"))
          $("div#row2").append($("<p>Name of Stadium: " + data.teams[0].strStadium + "</p>"))
          $("div#row2").append($("<p>Location: " + data.teams[0].strStadiumLocation + "</p>"))
          $("div#row2").append($("<p>Number of Capacity: " + data.teams[0].intStadiumCapacity + "</p>"))
        }

        if (data.teams[0].strManager) {
          $("div#row2").append($("<p>Coach: " + data.teams[0].strManager + "</p>"))
        }

        var address = data.teams[0].strStadiumLocation;

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
          var address = data.teams[0].strStadiumLocation;
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

      });
    } else if (type == 'all-players') {
      // Find the players by team

      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=" + result, function(data) {

        for (var i = 0; i < data.player.length; i++) {

          $("div#row2").append($('<div class="col-md-4 players-info" id=' + i + '></div>'));
          
          if (!data.player[i].strCutout) {
            $("#" + i).append($("<img src= /bean.jpg >"));
          } else {
            $("#" + i).append($("<img src=" + data.player[i].strCutout + ">"));
          }
          $("#" + i).append($("<h2>" + data.player[i].strPlayer + "</h2>"));
          $("#" + i).append($("<p>Nationality: " + data.player[i].strNationality + "</p>"));
          $("#" + i).append($("<p>Number: " + data.player[i].intSoccerXMLTeamID + "</p>"));
        }
      });
    } else if (type == 'player') {
      // Find the players by team

      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=" + result, function(data) {

        for (var i = 0; i < data.player.length; i++) {
          if (data.player[i].strSport == "Soccer") {
            if(data.player.length < 3){

              $("div#row2").append($('<div id=' + i + '></div>'));

              if (!data.player[i].strCutout) {
                $("#" + i).append($("<img src= /bean.jpg >"));
              } else {
                $("#" + i).append($("<img src=" + data.player[i].strCutout + ">"));
              }
              $("#" + i).append($("<h3>" + data.player[i].strPlayer + "</h3>"));
              $("#" + i).append($("<p>Nationality: " + data.player[i].strNationality + "</p>"));
              if (data.player[i].strTeam == "_Retired Soccer") {
                $("#" + i).append($("<p>Status: Retired</p>"));
              } else {
                $("#" + i).append($("<p>Team: " + data.player[i].strTeam + "</p>"));
              }
            }
            else {
              $("div#row2").append($('<div class="col-md-4 players-info" id=' + i + '></div>'));

              if (!data.player[i].strCutout) {
                $("#" + i).append($("<img src= /bean.jpg >"));
              } else {
                $("#" + i).append($("<img src=" + data.player[i].strCutout + ">"));
              }
              $("#" + i).append($("<h3>" + data.player[i].strPlayer + "</h3>"));
              $("#" + i).append($("<p>Nationality: " + data.player[i].strNationality + "</p>"));
              if (data.player[i].strTeam == "_Retired Soccer") {
                $("#" + i).append($("<p>Status: Retired</p>"));
              } else {
                $("#" + i).append($("<p>Team: " + data.player[i].strTeam + "</p>"));
              }
            }
          }
        }
      });
    } else if (type == 'all-leagues') {

      // Find the league by country

      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=" + result, function(data) {

        for (var i = 0; i < data.countrys.length; i++) {
          if (data.countrys[i].strSport == "Soccer") {
            if (!data.countrys[i].strBadge) {
              $("div#row2").append($("<img src= /bean.jpg >").width("70%").height("70%"));
            } else {
              $("div#row2").append($("<img src=" + data.countrys[i].strBadge + ">").width("40%").height("40%"));
            }
            $("div#row2").append($("<h3>" + data.countrys[i].strLeague + "</h3>"));
            if (data.countrys[i].strLeagueAlternate) {
              $("div#row2").append($("<h2> (a.k.a: " + data.countrys[i].strLeagueAlternate + ")</h2>"));
            }
            $("div#row2").append($("<h4>Founded: " + data.countrys[i].intFormedYear + "</h4>"));
          }
        }
      });
    } else if (type == 'all-teams') {
      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" + result, function(data) {
        for (var i = 0; i < data.teams.length; i++) {

          $("div#row2").append($('<div class="col-md-4 league-teams" id=' + i + '></div>'));

          if (!data.teams[i].strTeamBadge) {
            $("#" + i + ".col-md-4" + ".league-teams").append($("<img src= /bean.jpg >"));
          } else {
            $("#" + i + ".col-md-4" + ".league-teams").append($("<img src=" + data.teams[i].strTeamBadge + ">").width("40%").height("40%"));
          }
          $("#" + i + ".col-md-4" + ".league-teams").append($("<h4>" + data.teams[i].strTeam + "</h4>"));
          if (!data.teams[i].strManager) {
            $("#" + i + ".col-md-4" + ".league-teams").append($("<p>Coach: N/A </p>"));
          } else {
            $("#" + i + ".col-md-4" + ".league-teams").append($("<p>Coach: " + data.teams[i].strManager + "</p>"));
          }
        }
      });
    }

    $("#search").val('');

  })


  var myform = $("form#myform");

  myform.submit(function(event){
  	event.preventDefault();

  	var params = myform.serializeArray().reduce(function(obj, item) {
       obj[item.name] = item.value;
       return obj;
    }, {});

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";

    var template_id = "football_genie";
    console.log(params);
    myform.find("button").text("Sending...");
    emailjs.send(service_id,template_id,params)
    	.then(function(){
         alert("Sent!");
         myform.find("button").text("Submit");
       }, function(err) {
         alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
         myform.find("button").text("Send");
      });
    return false;
  });

  //Clear search bar



});
