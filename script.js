$(function () {
    $("#search-button").on("click", handleSearch);
  
    function handleSearch(event) {
      event.preventDefault();
      
      var city = $("#city-input").val();
      var APIKey = "16adc1a4b0a5cdc4173daf12df01f3fc";
      var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
  
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var forecastDays = [];
        forecastDays.push(response.list[0]);
        forecastDays.push(response.list[8]);
        forecastDays.push(response.list[16]);
        forecastDays.push(response.list[24]);
        forecastDays.push(response.list[32]);
  
  
        for (var i = 0; i < forecastDays.length; i++) {
          var forecastContainer = $("<div>").addClass("forecast-day");
          $(".forecast-day").css('margin', '5px')
          var dateEl = $("<div>").text(forecastDays[i].dt);
          var iconEl = $("<div>").text("icon id: " + forecastDays[i].weather[0].icon);
          var tempEl = $("<div>").text("Temp: " + forecastDays[i].main.temp + " °F");
          var humidityEl = $("<div>").text("Humidity: " + forecastDays[i].main.humidity + "%");
          
          forecastContainer.append(dateEl, iconEl, tempEl, humidityEl);
          $("#forecast").append(forecastContainer);
        }
      });
    }
  });


  $(function () {
    $("#search-button").on("click", weatherDashboard);

  function weatherDashboard(city) {
    event.preventDefault();
      var key = "16adc1a4b0a5cdc4173daf12df01f3fc";
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var icon =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

    $("#name").text(response.name);
    $("#date").text(`(${moment().format("L")})`);
    $("#weatherIcon").attr("src", icon);
    $("#temp").text(response.main.temp); 
    $("#humidity").text(response.main.humidity);
    $("#wind").text(response.wind.speed);
    $("#weatherInfo").css("display", "block");
    })};
  })