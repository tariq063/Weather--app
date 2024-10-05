const apiKey = 'afa05acc0e00a5b052d4e4dfe85b526b'; // Your API key
const searchButton = document.querySelector('.search button');
const cityInput = document.querySelector('.search input');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const weatherIconElement = document.querySelector('.weather-icon i');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    fetchWeatherData(city);
});

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const weatherIcon = data.weather[0].icon;

                tempElement.textContent = `${temperature}°C`;
                cityElement.textContent = city;
                humidityElement.textContent = `${humidity}%`;
                windElement.textContent = `${windSpeed} km/h`;

                // Update weather icon
                weatherIconElement.className = `fas fa-${getWeatherIconClass(weatherIcon)}`;
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function getWeatherIconClass(icon) {
    // Map OpenWeatherMap icon codes to Font Awesome icons
    const iconMap = {
        '01d': 'sun',
        '01n': 'moon',
        '02d': 'cloud-sun',
        '02n': 'cloud-moon',
        '03d': 'cloud',
        '03n': 'cloud',
        '04d': 'cloud-meatball',
        '04n': 'cloud-meatball',
        '09d': 'cloud-showers-heavy',
        '09n': 'cloud-showers-heavy',
        '10d': 'cloud-sun-rain',
        '10n': 'cloud-moon-rain',
        '11d': 'poo-storm',
        '11n': 'poo-storm',
        '13d': 'snowflake',
        '13n': 'snowflake',
        '50d': 'smog',
        '50n': 'smog'
    };
    return iconMap[icon] || 'cloud';
}

const toggleSwitch = document.getElementById('theme-toggle');

toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', toggleSwitch.checked);
});
