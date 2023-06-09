import { key } from "./key.js";

const result = document.getElementById('result');
const searchButton = document.querySelector('.btn');
const input = document.getElementById('city');

searchButton.addEventListener('click', getWeather);

function getWeather() {
    const inputValue = input.value;

    if (inputValue.length === 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}`
        fetch(url).then((data) => data.json()).then((data) => {
            input.value = "";
            console.log(data);
            console.log(data.name);
            console.log(data.weather[0].description);
            console.log(data.weather[0].main);
            console.log(data.weather[0].icon);
            console.log(data.main.temp);
            console.log(data.main.temp_max);
            console.log(data.main.temp_min);
            result.innerHTML = `
            
            <h2>${data.name}</h2>
            <h4 class="weather">${data.weather[0].main}</h4>
            <h4>${data.weather[0].description}</h4>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Ícone de acordo com o tempo">
            <h1>${(data.main.temp / 10).toFixed(2)} &#176</h1>
            
            <div class="weather-container">
                <div>
                    <h4 class="title">Min</h4>
                    <h4 class="temp">${(data.main.temp_min / 10).toFixed(2)}</h4>
                    </div>
                <div>
                    <h4 class="title">Max</h4>
                    <h4 class="temp">${(data.main.temp_max / 10).toFixed(2)}</h4>
                </div>
            </div>
            `
        }).catch(() => {
            result.innerHTML = `<h3 class="msg">City not found</h3>`;
        });
    }

}