$(document).ready(function() {

    $("#city").html("&deg");

    //Tests to see if navigator will work.
    if (!navigator.geolocation) {
        $("#city").html("Your browser does not support the Weather API.");
        return;
    }

    //Gets the weather once the person approves
    function getWeather(personLocation) {

        var latitude = personLocation.coords.latitude;
        var longitude = personLocation.coords.longitude;
        //var apiUrl = "https://api.wunderground.com/api/7d3df977a43df28b/geolookup/conditions/lang:EN/q/";
        var apiUrl = "https://api.wunderground.com/api/7d3df977a43df28b/geolookup/conditions/lang:EN/q/";
        apiUrl += latitude + "," + longitude + ".json";
        var location;
        var temp_c;
        var temp_f;
        var icon;


        console.log(apiUrl);

        $.ajax({
            url: apiUrl,
            dataType: "jsonp",
            success: function(parsed_json) {
                location = parsed_json.location.nearby_weather_stations.pws.station[0].city;
                temp_c = parsed_json.current_observation.temp_c + "&#8451";
                temp_f = parsed_json.current_observation.temp_f + "&#8457";
                icon = parsed_json.current_observation.icon;
                //Default is Celcius. Go Canada.
                //iconHtml = "<h2><i class ='wi wi-" + icon + "'></i>" + temp_c + "</h2>";
                $("#icon").html(function() {
                    changeWeather(icon, temp_c)
                });

                //alert("Current temperature in " + location + " is: " + temp_c);
                $("#city").html(location);
                //  $("#temp").html(temp_c);
                //  $("#descriptor").html("&#8451");
                //$("#icon").html(iconHtml);


                $("#btnCelcius").click(function() {
                    changeWeather(icon, temp_c);
                });


                $("#btnFarenheit").click(function() {
                    changeWeather(icon, temp_f);
                });
            }


        });
    }

    function apiError() {
        $("demo").html = "Unable to get the weather";
    }

    navigator.geolocation.getCurrentPosition(getWeather, apiError);

    //issue with click events running straight away.
    function changeWeather(usedIcon, tempScale) {
        var changeHTML;
        changeHTML = "<h2><i class ='wi wi-" + usedIcon + "'></i>" + tempScale + "</h2>";
        $("#icon").html(changeHTML);
    }

});
