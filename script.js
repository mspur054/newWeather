$(document).ready(function() {

      $("#city").html("WHATUP");

      if (!navigator.geolocation) {
        $("#city").html("Your browser does not support the Weather API.");
        return;
      }

      function getWeather(personLocation) {

        var latitude = personLocation.coords.latitude;
        var longitude = personLocation.coords.longitude;

        var apiUrl = "https://api.wunderground.com/api/7d3df977a43df28b/geolookup/conditions/lang:EN/q/";
        apiUrl += latitude + "," + longitude + ".json";
        var location;
        var temp_c;
        var temp_f;

        $.ajax({
            url: apiUrl,
            dataType: "jsonp",
            success: function(parsed_json) {
              location = parsed_json.location.nearby_weather_stations.pws.station[0].city;
              temp_c = parsed_json.current_observation.temp_c;
              temp_f = parsed_json.current_observation.temp_f;
              //alert("Current temperature in " + location + " is: " + temp_c);
              $("#city").html(location + " ");
              $("#temp").html(temp_c);
              $("#descriptor").html("&#8451");
              
              
              $("#btnCelcius").on("click",
              function() {
                $("#temp").html(temp_c);
                $("#descriptor").html("&#8451");
              });

              $("#btnFarenheit").on("click",
                function() {
                  $("#temp").html(temp_f);
                  $("#descriptor").html("&#8457");
                });
            }


              });
          }

          function apiError() {
            $("demo").html = "Unable to get the weather";
          }

          navigator.geolocation.getCurrentPosition(getWeather, apiError);

        });
