//49b666df9477d73907187f39109fbd5d
var currentCityEl = document.getElementById("city-name")
var currentTempEl = document.getElementById("temp");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var currentUvEl = document.getElementById("Uv-index");



$(document).ready(function () {
    var searchContainer = $('#search-list')
    var searchBar = $('#search-bar');
    var apiKey = '49b666df9477d73907187f39109fbd5d';
    searchBar.submit(function (event) {
        event.preventDefault();
        var searchVal = $(this).serializeArray();
        var city = searchVal[0].value;
        var searchEl = $('<div class="search-list">');
        searchEl.text(city);
        searchContainer.append(searchEl);
        getcurrentWeather(city);
    });
    function getcurrentWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
        fetch(queryURL).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                var cityName = data.name;
                var temp = data.main.temp;
                var humidity = data.main.humidity
                var weather = data.weather;
                var wind = data.wind
                currentCityEl.innerText = cityName
                currentTempEl.innerText = "Temperature: " + temp
                currentHumidityEl.innerText = "Humidity: " + humidity
                currentWindEl.innerText = "Wind: " + wind + "speed"
            });
    }
});



