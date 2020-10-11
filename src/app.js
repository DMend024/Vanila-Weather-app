import "./styles.css";

//city search
function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#home-city");
  let newCity = document.querySelector("#city-input");
  cityName.innerHTML = `${newCity.value}`;
  citySearch(newCity.value);
}
//temp convert

function celsiusConvert(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-show");
  temperature.innerHTML = `HI 42°C`;
}
function fahrenheitConvert(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp-show");
  temperature.innerHTML = "HI 108 °F";
}
//date display current
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

function citySearch(city) {
  let units = "imperial";
  let apiKey = "fadfb1390311deae378c688ab6fe986b";
  let apiSearch = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiSearch}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(citySearchTemp);
}
function citySearchTemp(respond) {
  let cityTemp = Math.round(respond.data.main.temp);
  let cityTempElement = document.querySelector("#temp-show");
  cityTempElement.innerHTML = `${cityTemp}°F`;
}
//current temp
function localTemp(respond) {
  let coordsTemp = Math.round(respond.data.main.temp);
  let localCoordsTemp = document.querySelector("#temp-show");
  localCoordsTemp.innerHTML = `${coordsTemp}°F`;
}
function findCoords(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let units = "imperial";
  let apiKey = "fadfb1390311deae378c688ab6fe986b";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(localTemp);
}
//current temp coord
navigator.geolocation.getCurrentPosition(findCoords);
let button = document.querySelector("button");
button.addEventListener("click", localTemp);
//City search
let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity);

//Temperature display
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConvert);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConvert);

//Current Date
let now = new Date();
let currentDate = document.querySelector("#date-today");
currentDate.innerHTML = dateToday(now);
//Weather by city
