function dateToday(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = date.getDay();
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = weekDay[today];
return `${day} ${hour}:${minutes}`;
}

function displayTemp(respond) {
    console.log(respond);
  let showCurrentTemp = Math.round(respond.data.main.temp);
  let windSpeed=document.querySelector("#wind-speed");
  let wind = (respond.data.wind.speed);
  let humidity=document.querySelector("#humidity");
  let humid=(respond.data.main.humidity);
  let currentTemp = document.querySelector("#temp-show");
  let high=document.querySelector("#high-temp");
let highTemp=Math.round(respond.data.main.temp_max);
let low=document.querySelector("#low-temp");
let lowTemp= Math.round(respond.data.main.temp_min);
  currentTemp.innerHTML = `${showCurrentTemp}°C`; 
  windSpeed.innerHTML= `Windspeed: ${wind} km/h`;
  humidity.innerHTML=  `Humidity: ${humid}%`;
  high.innerHTML=`HI ${highTemp}°C`;
  low.innerHTML=`LO ${lowTemp}°C`;
}

function findCoords(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let units = "metric";
  let apiKey="88859cfce5e0480cf3a55a6721b52598";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function celsiusConvert(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = document.querySelector("#temp-show");
  celsiusTemperature.innerHTML = `${cityTemp} °C`;
}
function fahrenheitConvert(event) {     
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#temp-show");
  temperature.innerHTML = `${cityTemp}`*9/5+32` °F`;

}

function showCity(event) {
 event.preventDefault();
  let cityName = document.querySelector("#home-city");
  let newCity = document.querySelector("#city-input");
  cityName.innerHTML = `${newCity.value}`;
  citySearch(newCity.value);
}


function citySearch(city) {
  let units = "metric";
  let apiKey="88859cfce5e0480cf3a55a6721b52598";
  let apiSearch = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiSearch}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}


navigator.geolocation.getCurrentPosition(findCoords);
let button = document.querySelector("button");
button.addEventListener("click", displayTemp);


let form=document.querySelector("#search-city");
form.addEventListener("submit",showCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConvert);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConvert);


let now = new Date();
let currentDate = document.querySelector("#today-date");
currentDate.innerHTML = dateToday(now);
