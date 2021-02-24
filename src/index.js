let apiKey = "6b953ee073bb6d456951bd28c1caeaaf";
function formatDate() {
  let today = new Date();
  let date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let time = today.getHours() + ":" + today.getMinutes();

  let dateTime = date + " " + time;
  document.getElementById("todays-date").innerHTML = dateTime;
}

function searchLocation(location) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
function weeklyForecast(response) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  for (let x = 1; x <= 5; x++) {
    const dayData = response.data.daily[x];
    console.log(dayData);
    document.getElementById(`day${x}`).innerHTML =
      days[new Date(dayData.dt * 1000).getDay()];
    document.getElementById(`temp${x}`).innerHTML =
      Math.round(dayData.temp.day) + "°C";
    document.getElementById(
      `icon${x}`
    ).innerHTML = `<img src="http://openweathermap.org/img/w/${dayData.weather[0].icon}.png"/>`;
  }
}

function searchWeeklyForecast(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weeklyForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `Current Temperature : ${temperature}°C`;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  document.getElementById("location-header").innerHTML = response.data.name;
  searchWeeklyForecast(response.data.coord.lat, response.data.coord.lon);
  document.getElementById("today").toggleAttribute("hidden", false);
  displayWindSpeed(response.data.wind.speed);
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(
    (locationObject) => {
      const lat = locationObject.coords.latitude;
      const lon = locationObject.coords.longitude;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(showTemperature);
    },
    (err) => console.log(err),
    { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
  );
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

formatDate();

let form = document.getElementById("search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let location = document.getElementById("chosen-city").value;
  searchLocation(location);
});

function displayWindSpeed(wind) {
  let windElement = document.querySelector("#wind-speed");
  const windSpeedKMH = Math.round(wind);
  windElement.innerHTML = `Wind Speed : ${windSpeedKMH}KMH`;

  //℉=(℃*1.8)+32

  //function temperatureConverter(valNum) {
  //valNum = parseFloat(valNum);
  //document.getElementById("outputFahrenheit").innerHTML=(valNum*1.8)+32;
}
