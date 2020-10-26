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

function displayLocalTemp(respond) {
  celsiusTemperature = Math.round(respond.data.main.temp);
  let currentLocation = (respond.data.name);
  let locationElement=document.querySelector ("#home-city");
  let windSpeed=document.querySelector("#wind-speed");
  let wind = (respond.data.wind.speed);
  let humidity=document.querySelector("#humidity");
  let humid=(respond.data.main.humidity);
  let currentTemp = document.querySelector("#temp-show");
  let icon =(respond.data.weather[0].icon);
  let iconImage=document.querySelector("#temp-icon");
  let cityTempDescriptor=document.querySelector("#weather-description");
  let description= (respond.data.weather[0].main);   
  highTemp=Math.round(respond.data.main.temp_max); 
  lowTemp= Math.round(respond.data.main.temp_min);
  currentTemp.innerHTML = `${celsiusTemperature}°C`; 
  windSpeed.innerHTML= `Windspeed: ${wind} km/h`;
  humidity.innerHTML=  `Humidity: ${humid}%`;
  high.innerHTML=`HI ${highTemp}°C`;
  low.innerHTML=`LO ${lowTemp}°C`;
  iconImage.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
  cityTempDescriptor.innerHTML=`Description: ${description}`;
  locationElement.innerHTML=`${currentLocation}`;
}

function findCoords(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let units = "metric";
  let apiKey="88859cfce5e0480cf3a55a6721b52598";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayLocalTemp);
}

function displayCityTemp(respond){
  celsiusTemperature = Math.round(respond.data.main.temp);
  let windSpeed=document.querySelector("#wind-speed");
  let wind = (respond.data.wind.speed);
  let humidity=document.querySelector("#humidity");
  let humid=(respond.data.main.humidity);
  let showCity = document.querySelector("#temp-show"); 
  let iconImage=document.querySelector("#temp-icon");
  let icon =(respond.data.weather[0].icon);
  let cityTempDescriptor=document.querySelector("#weather-description");
  let description= (respond.data.weather[0].main);
  highTemp=Math.round(respond.data.main.temp_max);
  lowTemp= Math.round(respond.data.main.temp_min);
  showCity.innerHTML = `${celsiusTemperature}°C`; 
  windSpeed.innerHTML= `Windspeed: ${wind} km/h`;
  humidity.innerHTML=  `Humidity: ${humid}%`;
  high.innerHTML=`HI ${highTemp}°C`;
  low.innerHTML=`LO ${lowTemp}°C`;
  iconImage.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
  cityTempDescriptor.innerHTML=`Description: ${description}`;
}

function citySearch(city) {
  let units = "metric";
  let apiKey="88859cfce5e0480cf3a55a6721b52598";
  let apiSearch = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiSearch}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCityTemp);
}
function showCity(event) {
 event.preventDefault();
  let cityName = document.querySelector("#home-city");
  let newCity = document.querySelector("#city-input");
  cityName.innerHTML = `${newCity.value}`;
  citySearch(newCity.value);
}


function celsiusConvert(event) {
  event.preventDefault()
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature=document.querySelector("#temp-show");
  temperature.innerHTML = `${celsiusTemperature}°C`;
  high.innerHTML=`HI ${highTemp}°C`;
  low.innerHTML=`LO ${lowTemp}°C`;
}

function fahrenheitConvert(event) {     
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature=document.querySelector("#temp-show");
  let fahrTemperature = Math.round((celsiusTemperature*9)/5+32);
  let fahrHighTemp=Math.round((highTemp*9)/5+32);
  let fahrLowTemp=Math.round((lowTemp*9)/5+32);
  temperature.innerHTML = `${fahrTemperature}°F`;
  high.innerHTML=`HI ${fahrHighTemp}°F`;
  low.innerHTML=`LO ${fahrLowTemp}°F`;
}

function getLocal(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCoords);
  return displayLocalTemp;
}

let celsiusTemperature=null;
let highTemp=null;
let lowTemp=null;
let high=document.querySelector("#high-temp");
let low=document.querySelector("#low-temp");

navigator.geolocation.getCurrentPosition(findCoords);
let button = document.querySelector("#current-button");
button.addEventListener("click", getLocal);

let form=document.querySelector("#search-city");
form.addEventListener("submit",showCity);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConvert);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConvert);

let now = new Date();
let currentDate = document.querySelector("#today-date");
currentDate.innerHTML = dateToday(now);
