let countryList;
let selectedCity = document.getElementById("selectedCity");

async function getCountries() {
  let ul = document.getElementById("menu-country");
  let selectedCountry = document.getElementById("selectedCountry");
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries");
    countryData = await response.json();
    for (let i = 0; i < countryData["data"].length; i++) {
      let text = document.createTextNode(countryData["data"][i].country);
      let li = document.createElement("li");
      li.classList.add("dropdown-item");
      li.classList.add("fs-4");
      li.appendChild(text);
      li.addEventListener("click", function () {
        selectedCountry.innerHTML = text.data;
        selectedCity.innerHTML = "Cities";
        getCities(i);
      });
      ul.appendChild(li);
    }
  } catch (error) {
    console.log("error: ", error)
  }
}


function getCities(index) {
  let ul = document.getElementById("menu-city");
  ul.replaceChildren();
  countryData["data"][index].cities.forEach(element => {
    let text = document.createTextNode(element);
    let li = document.createElement("li");
    li.classList.add("dropdown-item");
    li.classList.add("fs-4");
    li.appendChild(text);
    li.addEventListener("click", function () {
      selectedCity.innerHTML = text.data;
      getWeather(text.data);
    });

    ul.appendChild(li);
  });
}

async function getWeather(city) {
  const API_KEY = "2b6fc034709f70ad0e769dd70ac76d07";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await fetch(URL);
    weatherData = await response.json();
    if (response.status === 200) {
      let cityName = document.getElementById("cityName");
      let cityTemp = document.getElementById("cityTemp");
      let cityIcon = document.getElementById("cityIcon");
      cityName.innerHTML = weatherData.name;
      cityTemp.innerHTML = `${weatherData.main.temp} °C`;
      cityIcon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
    }
    else if (response.status === 404) {

      alert("selected city is not found");
    } else {
      alert("error - response status:  " + response.status);
    }
  } catch (error) {
    console.log(error);
  }

}

async function allFn() {
  await getCountries();
  // await getWeather();
}

allFn();
