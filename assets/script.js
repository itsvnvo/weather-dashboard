//49b666df9477d73907187f39109fbd5d

//Variables
var currentCityEl = document.getElementById("city-name")
var currentTempEl = document.getElementById("temp");
var currentHumidityEl = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var currentUvEl = document.getElementById("UV-index");
var currentPicEl = document.getElementById("current-pic");
var weatherPicEl = document.getElementById("icon-pic");
var fivedayContainer = $("#fiveday-forecast");
var historyContainer = $('#search-list')
var historyEl = [];


$(document).ready(function () {
    var searchContainer = $('#search-list')
    var searchBar = $('#search-bar');
    var apiKey = '49b666df9477d73907187f39109fbd5d';
    searchBar.submit(function (event) {
        event.preventDefault();
        var searchVal = $(this).serializeArray();
        var city = searchVal[0].value;
        var searchEl = $('<button type="button" class="btn past-search">');
        searchEl.click(function (event) {
            event.preventDefault();
            var value = $(this).text();
            getcurrentWeather(value);
            fivedayWeather(value);
        });
        historyEl.push(city);
        localStorage.setItem('historyEl', JSON.stringify(historyEl));
        searchEl.text(city);
        searchContainer.append(searchEl);
        getcurrentWeather(city);
        fivedayWeather(city);
    });
    // Gets api data and displays what is current inside element variables
    function getcurrentWeather(city) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
        var UvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat="
        fetch(queryURL).then(function (response) {
            return response.json();
        })
            .then(function (data) {
                var cityName = data.name;
                var temp = data.main.temp;
                var humidity = data.main.humidity
                var wind = data.wind.speed
                var weatherPic = data.weather[0].icon;
                var lat = data.coord.lat
                var lon = data.coord.lon
                var Uv = UvUrl + lat + "&lon=" + lon + "&appid=" + apiKey
                weatherPicEl.setAttribute("src", "https://openweathermap.org/img/w/" + weatherPic + ".png");
                weatherPicEl.setAttribute("alt", data.weather[0].description);
                currentCityEl.innerText = cityName
                currentTempEl.innerText = "Temperature: " + temp + " F"
                currentHumidityEl.innerText = "Humidity: " + humidity + " %"
                currentWindEl.innerText = "Wind speed: " + wind + " MPH"
            });
    }
    // Gets api data and displays five days what is current inside element variables
    function fivedayWeather(city) {
        fivedayContainer.html('');
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
                    var weather = fiveday.weather
                    var iconURL = "https://openweathermap.org/img/w/" + weather[0].icon + '.png'
                    var dayEl = moment(fiveday.dt_txt).format('MMMM Do, dddd');
                    var cardDiv = $("<div class='card-body'>")
                    var dayDiv = $("<div class='card text-white bg-primary mb-3 day-name'>");
                    var weatherImg = $("<img class='icon-name' />")
                    var tempDiv = $("<div class='temp-name'>");
                    var humidityDiv = $("<div class='humidity-name'>");
                    var windDiv = $("<div class='wind-name'>");
                    weatherImg.attr('src', iconURL)
                    dayDiv.text(dayEl);
                    tempDiv.text("Temperature: " + tempFive + " F");
                    humidityDiv.text("Humidity: " + humidityFive + " %");
                    windDiv.text("Wind: " + windFive.speed + " MPH");
                    cardDiv.append(dayDiv);
                    cardDiv.append(weatherImg);
                    cardDiv.append(tempDiv);
                    cardDiv.append(humidityDiv);
                    cardDiv.append(windDiv);
                    fivedayContainer.append(cardDiv);
                }
            }
        });
    };
    function retrieveHist() {
        if (localStorage.getItem('historyEl'))
            historyEl = JSON.parse(localStorage.getItem('historyEl'))
        for (var i = 0; i < historyEl.length; i++) {
            var searchEl = $('<button type="button" class="btn past-search">')
            searchEl.click(function (event) {
                event.preventDefault();
                var value = $(this).text()
                getcurrentWeather(value);
                fivedayWeather(value);
            });
            searchEl.text(historyEl[i]);
            historyContainer.append(searchEl);
        }
    }
    retrieveHist();
    console.log(historyEl);
});



