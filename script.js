document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from Rest Countries API
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the countries and create Bootstrap cards
      data.forEach((country) => {
        createCountryCard(country);
      });
    })
    .catch((error) => console.error("Error fetching countries:", error));
});

function createCountryCard(country) {
  // Create Bootstrap card elements
  const card = document.createElement("div");
  card.classList.add("col-lg-4", "col-sm-12", "mb-4");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.textContent = country.name.common;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Display the specified values in the Bootstrap card
  const capital = document.createElement("p");
  capital.textContent = `Capital: ${country.capital[0]}`;

  const latlng = document.createElement("p");
  latlng.textContent = `Latlng: ${country.latlng.join(", ")}`;

  const flagImg = document.createElement("img");
  flagImg.src = country.flags.png;
  flagImg.alt = `Flag of ${country.name.common}`;
  flagImg.classList.add("img-fluid", "mb-2");

  const region = document.createElement("p");
  region.textContent = `Region: ${country.region}`;

  const countryName = document.createElement("p");
  countryName.textContent = `Name: ${country.name.common}`;

  const countryCodes = document.createElement("p");
  countryCodes.textContent = `Country Codes: ${Object.keys(country.cca2).join(
    ", "
  )}`;

  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Get Weather";
  button.addEventListener("click", () => getWeather(country.capital[0]));

  // Append elements to card body
  cardBody.appendChild(capital);
  cardBody.appendChild(latlng);
  cardBody.appendChild(flagImg);
  cardBody.appendChild(region);
  cardBody.appendChild(countryName);
  cardBody.appendChild(countryCodes);
  cardBody.appendChild(button);

  // Append card elements
  cardContainer.appendChild(cardHeader);
  cardContainer.appendChild(cardBody);
  card.appendChild(cardContainer);
  document.getElementById("countryList").appendChild(card);
}

function getWeather(city) {
    // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key
    const openWeatherApiKey = "https://openweathermap.org/";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(weatherData => {
            // Extracted relevant weather information
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            // Display the weather information
            alert(`Temperature: ${temperature}K (${(temperature - 273.15).toFixed(2)}°C), Weather: ${description}`);
        })
        .catch(error => console.error('Error fetching weather:', error));
}
