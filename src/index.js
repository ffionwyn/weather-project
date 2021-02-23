let apiKey = "6b953ee073bb6d456951bd28c1caeaaf";
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `Today is ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  return formattedDate;
}

  function searchLocation(location) {
   
    
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      console.log(apiUrl);
      axios.get(apiUrl).then(showTemperature);
  }

  function showTemperature(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}°C`;
 let description = document.querySelector("#temperature-description");
 description.innerHTML = response.data.weather[0].description;
 document.getElementById("location-header").innerHTML = response.data.name;
  }
  

  function getCurrentLocation(event) {
    event.preventDefault();
   navigator.geolocation.getCurrentPosition(locationObject=> 
  {console.log(locationObject) 
    const lat = locationObject.coords.latitude;
    const lon = locationObject.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(showTemperature);
  })
  }
  let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);



  formatDate();

  let form = document.getElementById("search-form");
  form.addEventListener("submit",  (event) => {
    console.log("HERE");
      event.preventDefault();
      let location = document.getElementById("chosen-city").value;
      searchLocation(location);

  });