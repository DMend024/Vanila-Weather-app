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



function localTemp(respond) {
  let coordsTemp = Math.round(respond.data.main.temp);
  console.log(respond)
  let localCoordsTemp = document.querySelector("#temp-show");
let sunriseElement=document.querySelector("#sunrise");
let sunsetElement=document.querySelector("#sunset");
  localCoordsTemp.innerHTML = `${coordsTemp}°F`;
sunriseElement.innerHTML=(respond.data.sys.sunsrise);
}
function findCoords(position) {
  let lat = Math.round(position.coords.latitude);
  let lon = Math.round(position.coords.longitude);
  let units = "imperial";
  let apiKey="88859cfce5e0480cf3a55a6721b52598";

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(localTemp);
}

function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#home-city");
  let newCity = document.querySelector("#city-input");
  cityName.innerHTML = `${newCity.value}`;
  console.log(newCity.value);
}

function citySearch(city) {
console.log(city);
  let units = "imperial";
  let apiKey="88859cfce5e0480cf3a55a6721b52598";
  let apiSearch ="https://api.openweathermap.org/data/2.5/forecast/daily";
  let apiUrl = `${apiSearch}?q=${showCity}&cnt=5&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(citySearchTemp);

}
navigator.geolocation.getCurrentPosition(findCoords);
let button = document.querySelector("button");
button.addEventListener("click", localTemp);


let form=document.querySelector("#search-city");
form.addEventListener("submit",showCity);

let now = new Date();
let currentDate = document.querySelector("#today-date");
currentDate.innerHTML = dateToday(now);
