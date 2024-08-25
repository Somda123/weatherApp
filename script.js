// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '7e1d467bf2914b51d47c0e460014b5bb';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert('Please enter a city name');
    }
});

function fetchWeather(city) {
    fetch(`${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.error('Error fetching weather:', error));
}

function fetchForecast(city) {
    fetch(`${baseUrl}forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '200') {
                displayForecast(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => console.error('Error fetching forecast:', error));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    // const dat = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });

    weatherInfo.innerHTML = `
        <div>
            <h3>${data.name}, ${data.sys.country}</h3>
             <p>Longitude: ${data.coord.lat} Degrees, Minutes, and Seconds(N)</p>
             <p>Latitude: ${data.coord.lon} Degrees, Minutes, and Seconds(E)</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Pressure: ${data.main.pressure} atm</p>
            <p>Sea-level: ${data.main.sea_level} atm</p>
             <p>Wind Speed: ${data.wind.speed} m/s, ${data.wind.deg}°</p>
            <p>Sunrise: ${data.sys.sunrise} </p>
            <p>Sunset: ${data.sys.sunset} </p>

            <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
        // <img src="http://openweathermap.org/img/wn/${data.main.humidity.icon}.png" alt="Weather Icon">
        </div>
    `;
}

function displayForecast(data) {
    const forecastInfo = document.getElementById('forecast-info');
    forecastInfo.innerHTML = '';

    const forecastList = data.list.filter((item, index) => index % 8 === 0);
    forecastList.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
        forecastInfo.innerHTML += `
            <div class="forecast-day">
                <p>${date}</p>
{ <p> Date : ${day.dt_txt}</p> }
                
                <p>Temp: ${day.main.temp}°C</p>
                <p>Weather: ${day.weather[0].description}</p>
                <p>Speed: ${day.wind.speed} m/s</p>

                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="Weather Icon">
            </div>
        `;
    });
}





