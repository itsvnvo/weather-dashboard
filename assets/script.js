//49b666df9477d73907187f39109fbd5d

//Variables
var currentCityEl = document.getElementById("city-name")
var currentTempEl = document.getElementById("temp");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var currentUvEl = document.getElementById("Uv-index");
var fivedayContainer = $("#fiveday-forecast")

$(document).ready(function () {
    var searchContainer = $('#search-list')
    var searchBar = $('#search-bar');
    var apiKey = '49b666df9477d73907187f39109fbd5d';
    searchBar.submit(function (event) {
        console.log(event)
        event.preventDefault();
        var searchVal = $(this).serializeArray();
        var city = searchVal[0].value;
        var searchEl = $('<div class="search-list">');
        searchEl.text(city);
        searchContainer.append(searchEl);
        getcurrentWeather(city);
        fivedayWeather(city);
        console.log(searchVal, city);
    });
    // Gets api data and displays what is current inside element variables
    function getcurrentWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
        fetch(queryURL).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                var cityName = data.name;
                var temp = data.main.temp;
                var humidity = data.main.humidity
                var wind = data.wind.speed
                currentCityEl.innerText = cityName
                currentTempEl.innerText = "Temperature: " + temp + " F"
                currentHumidityEl.innerText = "Humidity: " + humidity + " %"
                currentWindEl.innerText = "Wind speed: " + wind + " MPH"
            });
    }
    // Gets api data and displays what is current inside element variables
    function fivedayWeather(city) {
        var fivedayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
        fetch(fivedayURL).then(function (response) {
            return response.json();
        }).then(function (data) {
            for (var i = 0; i < data.list.length; i++) {
                var clockEl = data.list[i].dt_txt.search('9:00:00');
                if (clockEl > -1) {
                    var fiveday = data.list[i];
                    var tempFive = fiveday.main.temp;
                    var humidityFive = fiveday.main.humidity;
                    var windFive = fiveday.wind;
                    var day = fiveday.dt_txt;
                    var dayDiv = $("<div class='day-name'>");
                    var tempDiv = $("<div class='temp-name'>");
                    var humidityDiv = $("<div class='humidity-name'>");
                    var windDiv = $("<div class='wind-name'>");
                    dayDiv.text(day);
                    tempDiv.text("Temperature: " + tempFive + " F");
                    humidityDiv.text("Humidity: " + humidityFive  + " %");
                    windDiv.text("Wind: " + windFive.speed + " MPH");
                    fivedayContainer.append(dayDiv);
                    fivedayContainer.append(tempDiv);
                    fivedayContainer.append(humidityDiv);
                    fivedayContainer.append(windDiv);
                }
            }
        });
    };
});



