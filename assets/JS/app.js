$(document).ready(function() {

  const loading = document.querySelector('.loading')

  $(document).on('click', '.nav-list li', function() {
         $(".nav-list li").removeClass("active");
         $(this).addClass("active");
  });

  $("#sub").click(function() {
    displayLoading();
    $("div#row2").empty();
    $("#map").empty();
    $('.container')[0].style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    var result = '';
    var type = '';

    result = $("#search").val();
    type = $("#choice").val();

    function displayLoading() {
      loading.classList.remove('hide')
    }

    function hideLoading() {
      loading.classList.add('hide')
    }

    if (type == 'team') {

      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=" + result, function(data) {

        hideLoading();

        if(!data.teams){
          $("div#row2").append($("<h3>Sorry you've entered the wrong data.</h3>"))
        }else{

        $("div#row2").append($("<h3>Country: " + data.teams[0].strCountry + "</h3>"))
        $("div#row2").append($("<h3>League: " + data.teams[0].strLeague + "</h3>"))

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

          if(data.teams[0].intFormedYear){
            $("div#row2").append($("<p>Year Built: " + data.teams[0].intFormedYear + "</p>"))
          }
          else {
            $("div#row2").append($("<p>Year Built: N/A </p>"))
          }

          $("div#row2").append($("<p>Location: " + data.teams[0].strStadiumLocation + "</p>"))
          $("div#row2").append($("<p>Number of Capacity: " + data.teams[0].intStadiumCapacity + "</p>"))

        }

        if (data.teams[0].strManager) {
          $("div#row2").append($("<p>Coach: " + data.teams[0].strManager + "</p>"))
        }

        if(data.teams[0].strWebsite){
          $("div#row2").append($('<a href="http://' + data.teams[0].strWebsite + '"><img class="social-image" alt="Website link" src="/assets/images/Website.png"></a>'));
        }

        if (data.teams[0].strFacebook) {
          $("div#row2").append($('<a href="https://' + data.teams[0].strFacebook + '"><img class="social-image" alt="Facebook link" src="/assets/images/Facebook_logo-8.png"></a>'));
        }
        if (data.teams[0].strTwitter) {
          $("div#row2").append($('<a href="https://' + data.teams[0].strTwitter + '"><img class="social-image" alt="Twitter Link" src="/assets/images/twitter-icon.png"></a>'));
        }
        if (data.teams[0].strInstagram) {
          $("div#row2").append($('<a href="https://' + data.teams[0].strInstagram + '"><img class="social-image" alt="Twitter Link" src="/assets/images/Instagram-logo.png"></a>'));
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
      }

      });
    } else if (type == 'all-players') {
      // Find the players by team

      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=" + result, function(data) {

        hideLoading();

        if(!data.player){
          $("div#row2").append($("<h3>Sorry you've entered the wrong data.</h3>"))
        }else{

        for (var i = 0; i < data.player.length; i++) {

          $("div#row2").append($('<div class="col-md-4 players-info" id=' + i + '></div>'));

          if (!data.player[i].strCutout) {
            $("#" + i).append($('<img class="players-image" src= /assets/images/bean.jpg >'));
          } else {
            $("#" + i).append($('<img class="players-image" src="' + data.player[i].strCutout + '">'));
          }
          $("#" + i).append($("<h2>" + data.player[i].strPlayer + "</h2>"));
          $("#" + i).append($("<p>DOB: " + data.player[i].dateBorn + "</p>"))
          $("#" + i).append($("<p>Nationality: " + data.player[i].strNationality + "</p>"));

          if(data.player[i].dateSigned){
            $("#" + i).append($("<p>Date signed: " + data.player[i].dateSigned + "</p>"));
          }

          if(data.player[i].strWage){
            $("#" + i).append($("<p>Wage: " + data.player[i].strWage + "</p>"));
          }

          if(data.player[i].strSigning){
            $("#" + i).append($("<p>Transfer fee: " + data.player[i].strSigning + "</p>"));
          }

          if(!data.player[i].strPosition || data.player[i].strPosition == 'NA'){
            $("#" + i).append($("<p>Position: N/A </p>"));
          }else{
            $("#" + i).append($("<p>Position: " + data.player[i].strPosition + "</p>"));
          }

          if(!data.player[i].strHeight || data.player[i].strHeight == 0){
            $("#" + i).append($("<p>Height: N/A </p>"));
          }else if(isNaN(data.player[i].strHeight)){
            $("#" + i).append($("<p>Height: " + data.player[i].strHeight + "</p>"));
          }else{
            $("#" + i).append($("<p>Height: " + data.player[i].strHeight + "m</p>"));
          }

          if(!data.player[i].strWeight || data.player[i].strWeight == 0){
            $("#" + i).append($("<p>Weight: N/A </p>"));
          }else if(isNaN(data.player[i].strWeight)){
            $("#" + i).append($("<p>Weight: " + data.player[i].strWeight + "</p>"));
          }else{
            $("#" + i).append($("<p>Weight: " + data.player[i].strWeight + " kg</p>"));
          }

          if (data.player[i].strFacebook) {
            $("#" + i).append($('<a href="https://' + data.player[i].strFacebook + '"><img class="social-image" alt="Facebook link" src="/assets/images/Facebook_logo-8.png"></a>'));
          }
          if (data.player[i].strTwitter) {
            $("#" + i).append($('<a href="https://' + data.player[i].strTwitter + '"><img class="social-image" alt="Twitter Link" src="/assets/images/twitter-icon.png"></a>'));
          }
          if (data.player[i].strInstagram) {
            $("#" + i).append($('<a href="https://' + data.player[i].strInstagram + '"><img class="social-image" alt="Twitter Link" src="/assets/images/Instagram-logo.png"></a>'));
          }
        }
      }
      });
    } else if (type == 'player') {
      // Find the players by team

      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=" + result, function(data) {

        hideLoading();

        if(!data.player){
          $("div#row2").append($("<h3>Sorry you've entered the wrong data.</h3>"))
        }else{

        for (var i = 0; i < data.player.length; i++) {
          if (data.player[i].strSport == "Soccer") {
            if (data.player.length < 3){
              $("div#row2").append($('<div id=' + i + '></div>'));
            }
            else {
              $("div#row2").append($('<div class="col-md-4 players-info" id=' + i + '></div>'));
            }

            if (!data.player[i].strCutout) {
              $("#" + i).append($('<img class="players-image" src= /assets/images/bean.jpg >'));
            } else {
              $("#" + i).append($('<img class="players-image" src="' + data.player[i].strCutout + '">'));
            }

            $("#" + i).append($("<h2>" + data.player[i].strPlayer + "</h2>"));
            $("#" + i).append($("<p>DOB: " + data.player[i].dateBorn + "</p>"))
            $("#" + i).append($("<p>Nationality: " + data.player[i].strNationality + "</p>"));

            if (data.player[i].strTeam == "_Retired Soccer") {
              $("#" + i).append($("<p>Status: Retired</p>"));
            } else {
              $("#" + i).append($("<p>Team: " + data.player[i].strTeam + "</p>"));
            }

            if(data.player[i].dateSigned){
              $("#" + i).append($("<p>Date signed: " + data.player[i].dateSigned + "</p>"));
            }

            if(data.player[i].strWage){
              $("#" + i).append($("<p>Wage: " + data.player[i].strWage + "</p>"));
            }

            if(data.player[i].strSigning){
              $("#" + i).append($("<p>Transfer fee: " + data.player[i].strSigning + "</p>"));
            }

            if(!data.player[i].strPosition || data.player[i].strPosition == 'NA'){
              $("#" + i).append($("<p>Position: N/A </p>"));
            }else{
              $("#" + i).append($("<p>Position: " + data.player[i].strPosition + "</p>"));
            }

            if(!data.player[i].strHeight || data.player[i].strHeight == 0){
              $("#" + i).append($("<p>Height: N/A </p>"));
            }else if(isNaN(data.player[i].strHeight)){
              $("#" + i).append($("<p>Height: " + data.player[i].strHeight + "</p>"));
            }else{
              $("#" + i).append($("<p>Height: " + data.player[i].strHeight + "m</p>"));
            }

            if(!data.player[i].strWeight || data.player[i].strWeight == 0){
              $("#" + i).append($("<p>Weight: N/A </p>"));
            }else if(isNaN(data.player[i].strWeight)){
              $("#" + i).append($("<p>Weight: " + data.player[i].strWeight + "</p>"));
            }else{
              $("#" + i).append($("<p>Weight: " + data.player[i].strWeight + " kg</p>"));
            }

            if (data.player[i].strFacebook) {
              $("#" + i).append($('<a href="https://' + data.player[i].strFacebook + '"><img class="social-image" alt="Facebook link" src="/assets/images/Facebook_logo-8.png"></a>'));
            }
            if (data.player[i].strTwitter) {
              $("#" + i).append($('<a href="https://' + data.player[i].strTwitter + '"><img class="social-image" alt="Twitter Link" src="/assets/images/twitter-icon.png"></a>'));
            }
            if (data.player[i].strInstagram) {
              $("#" + i).append($('<a href="https://' + data.player[i].strInstagram + '"><img class="social-image" alt="Twitter Link" src="/assets/images/Instagram-logo.png"></a>'));
            }
          }
        }
      }
      });
    } else if (type == 'all-leagues') {

      // Find the league by country

      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=" + result, function(data) {

        hideLoading();

        if(!data.countrys){
          $("div#row2").append($("<h3>Sorry you've entered the wrong data.</h3>"))
        }else{

        for (var i = 0; i < data.countrys.length; i++) {
          if (data.countrys[i].strSport == "Soccer") {

            $("div#row2").append($('<div class="leagues-info" id=' + i + '></div>'));

            if (!data.countrys[i].strBadge) {
              $("#" + i).append($("<img class='leagues-image' src= /assets/images/bean.jpg >").width("70%").height("70%"));
            } else {
              $("#" + i).append($("<img class='leagues-image' src=" + data.countrys[i].strBadge + ">").width("40%").height("40%"));
            }

            $("#" + i).append($("<h3>" + data.countrys[i].strLeague + "</h3>"));

            if (data.countrys[i].strLeagueAlternate) {
              $("#" + i).append($("<h2> (a.k.a: " + data.countrys[i].strLeagueAlternate + ")</h2>"));
            }

            $("#" + i).append($("<h4>Founded: " + data.countrys[i].intFormedYear + "</h4>"));

            if(data.countrys[i].strWebsite){
              $("#" + i).append($('<a href="http://' + data.countrys[i].strWebsite + '"><img class="social-image" alt="Website link" src="/assets/images/Website.png"></a>'));
            }

            if (data.countrys[i].strFacebook) {
              $("#" + i).append($('<a href="https://' + data.countrys[i].strFacebook + '"><img class="social-image" alt="Facebook link" src="/assets/images/Facebook_logo-8.png"></a>'));
            }

            if (data.countrys[i].strTwitter) {
              $("#" + i).append($('<a href="https://' + data.countrys[i].strTwitter + '"><img class="social-image" alt="Twitter Link" src="/assets/images/twitter-icon.png"></a>'));
            }

            if (data.countrys[i].strInstagram) {
              $("#" + i).append($('<a href="https://' + data.countrys[i].strInstagram + '"><img class="social-image" alt="Twitter Link" src="/assets/images/Instagram-logo.png"></a>'));
            }
          }
        }
      }
      });
    } else if (type == 'all-teams') {
      $.get("https://cors-anywhere.herokuapp.com/http://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=" + result, function(data) {

        hideLoading();

        if(!data.teams){
          $("div#row2").append($("<h3>Sorry you've entered the wrong data.</h3>"))
        }else{

        for (var i = 0; i < data.teams.length; i++) {

          $("div#row2").append($('<div class="col-md-4 league-teams" id=' + i + '></div>'));

          if (!data.teams[i].strTeamBadge) {
            $("#" + i).append($("<img src= /assets/images/bean.jpg >"));
          } else {
            $("#" + i).append($("<img src=" + data.teams[i].strTeamBadge + ">").width("40%").height("40%"));
          }

          $("#" + i).append($("<h2>" + data.teams[i].strTeam + "</h2>"));

          if(data.teams[i].intFormedYear && data.teams[i].intFormedYear != 0){
            $("#" + i).append($("<p>Founded: " + data.teams[i].intFormedYear + "</p>"));
          }else{
            $("#" + i).append($("<p>Founded: N/A</p>"));
          }


          if (!data.teams[i].strManager) {
            $("#" + i).append($("<p>Coach: N/A </p>"));
          } else {
            $("#" + i).append($("<p>Coach: " + data.teams[i].strManager + "</p>"));
          }

          if(data.teams[i].strWebsite){
            $("#" + i).append($('<a href="http://' + data.teams[i].strWebsite + '"><img class="social-image" alt="Website link" src="/assets/images/Website.png"></a>'));
          }

          if (data.teams[i].strFacebook) {
            $("#" + i).append($('<a href="https://' + data.teams[i].strFacebook + '"><img class="social-image" alt="Facebook link" src="/assets/images/Facebook_logo-8.png"></a>'));
          }

          if (data.teams[i].strTwitter) {
            $("#" + i).append($('<a href="https://' + data.teams[i].strTwitter + '"><img class="social-image" alt="Twitter Link" src="/assets/images/twitter-icon.png"></a>'));
          }

          if (data.teams[i].strInstagram) {
            $("#" + i).append($('<a href="https://' + data.teams[i].strInstagram + '"><img class="social-image" alt="Twitter Link" src="/assets/images/Instagram-logo.png"></a>'));
          }
        }
      }
      });
    }

    //Clear Search Bar
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

});
