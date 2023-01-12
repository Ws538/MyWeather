var container = document.querySelector("#container");

var weatherApiKey = "f9c67933903c3338d119480bf3f2e575";

let weather = {
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        weatherApiKey +
        "&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    var { temp, humidity } = data.main;

    var { icon, description } = data.weather[0];

    var { speed } = data.wind;

    var { name } = data;

    var { dt } = data;

    var { timezone } = data;

    var dtc = dt + timezone;

    var d = new Date(dtc * 1000).toGMTString().toLocaleString("en-AU")

    let twoDigitInteger;

    let num = Math.floor(temp);

    if (num >= 10 && num < 100) {
      twoDigitInteger = num;
    }

    console.log(name, d, timezone, icon, description, num, humidity, speed);

    document.body.style.backgroundImage =
      "url(https://source.unsplash.com/2560x1440/?" + name + ")";
    document.querySelector(".cityname").innerHTML = "Weather in " + name;
    document.querySelector(".temp").innerHTML = num + "°C";
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML =
      "Humidity:" + " " + humidity + "%";
    document.querySelector(".windSpeed").innerHTML =
      "Wind Speed:" + " " + speed + "km/h";
    document.querySelector(".timeNow").innerHTML = d
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search").value);
  },
};

var search = document.querySelector(".search");

var button = document.querySelector("button");

var input = document.querySelector("input");

button.addEventListener("click", function () {
  weather.search();
  weatherFive.search();
  input.value = "";
});

search.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
    weatherFive.search();
    input.value = "";
  }
});

let weatherFive = {
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=f9c67933903c3338d119480bf3f2e575&units=metric"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeatherFive(data));
  },
  displayWeatherFive: function (data) {
    for (i = 0; i < 5; i++) {
      var dt  = data.list[i].dt;

      var d = new Date(dt * 1000).toLocaleTimeString("en-AU");  

      var tempmin = data.list[i].main.temp_min;

      var tempmax = data.list[i].main.temp_max;

      console.log(dt, tempmin, tempmax);

      document.getElementById("day" + (i + 1)).innerHTML = d;
      document.getElementById("mintemp" + (i + 1)).innerHTML =
        "Low:" + " " + tempmin + "°C";
      document.getElementById("maxtemp" + (i + 1)).innerHTML =
        "High:" + " " + tempmax + "°C";
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search").value);
  },
};

weather.fetchWeather("Sydney");
weatherFive.fetchWeather("Sydney");
