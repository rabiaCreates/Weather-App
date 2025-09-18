const apiKey = "e02cdbca28d385c239b786b8f423221d"; // Replace if invalid
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM Elements (renamed for clarity)
const cityElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(cityName) {
  if (!cityName) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Update DOM
    cityElement.textContent = data.name;
    temperatureElement.textContent = Math.round(data.main.temp) + "°C";
    humidityElement.textContent = data.main.humidity + "%";
    windElement.textContent = data.wind.speed + " km/h";

    if(data.weather[0].main === "Clouds") {
        weatherIcon.src = "clouds.png";
    } else if(data.weather[0].main === "Clear") {
        weatherIcon.src = "clear.png";
    } else if(data.weather[0].main === "Rain") {
        weatherIcon.src = "rain.png";
    } else if(data.weather[0].main === "Drizzle") {
        weatherIcon.src = "drizzle.png";
    } else if(data.weather[0].main === "Mist") {
        weatherIcon.src = "mist.png";
    }

  } catch (error) {
    console.error("Failed to fetch weather:", error);
    alert("City not found or API error!");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim()); // Trim whitespace
});

