
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


let form=document.querySelector("#search-city");
form.addEventListener("submit",showCity);