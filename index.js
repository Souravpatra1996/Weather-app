
const API_KEY = '895c7dfc2e4b56c8ab309e70cee874ce'; 


const searchInput = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const iconMap = {
    Clear: 'clear.png',
    Clouds: 'clouds.png',
    Rain: 'rain.png',
    Drizzle: 'drizzle.png',
    Mist: 'mist.png',
    Snow: 'snow.png'
};

async function checkWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=${cityName}`);
        const data = await response.json();

        if (data.cod !== 200) {
            alert('City not found! Try another city.');
            return;
        }

        temp.innerHTML = Math.round(data.main.temp) + '°C';
        city.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + '%';
        wind.innerHTML = data.wind.speed + ' km/h';

        const condition = data.weather[0].main;
        weatherIcon.src = `images/${iconMap[condition] || 'mist.png'}`;

    } catch (error) {
        alert('Error fetching weather data. Check API key and internet.');
        console.error(error);
    }
}

searchBtn.addEventListener('click', () => checkWeather(searchInput.value.trim()));

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchInput.value.trim());
    }
});

checkWeather('Kolkata');

