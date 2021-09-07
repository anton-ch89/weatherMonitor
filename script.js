'use strict';

window.addEventListener('load', () => {
    let longit = null;
    let latet = null;
    const timezone = document.querySelector('.location-timezone');
    const temperatureValue = document.querySelector('.tempeature-value'),
    temperature = document.querySelector('.temperature'),
     description = document.querySelector('.temperature-description'),
     location = document.querySelector('.location'),
     body = document.querySelector('body'),
     degree = document.querySelector('.degree');
    const clock = () => {
        const date = new Date();
        const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(),
            minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
            seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
        document.querySelector('.new-date').textContent = hours  + ':' + minutes + ':' + seconds;
        if( hours >= 0  && hours <= 4){
            body.classList.add('night');
        }else if(hours >= 5  && hours <= 9){
            body.classList.add('sunset');
        }else if(hours >= 10  && hours <= 17){
            body.classList.add('day');
        }else if(hours >= 18  && hours <= 23){
            body.classList.add('sunset');
        }
    };
    setInterval(clock, 1000);
    clock();

    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longit = position.coords.longitude;
            latet = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latet}&lon=${longit}&appid=00937aadd0d49ca55c8bdf17e314bee9`;

            fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {main, name, weather} = data;

            timezone.textContent = name;
            temperatureValue.textContent = Math.round(main.temp-273.15);
            description.textContent = weather[0].description.toUpperCase();
            location.insertAdjacentHTML('beforeend', `<img src=./icons/${weather[0].icon}.png>`);
            temperature.addEventListener('click', () => {
                if(degree.textContent === '°C') {
                    degree.textContent = '°F';
                    temperatureValue.textContent = Math.round((main.temp-273.15)*9/5 +32);
                } else {
                    degree.textContent = '°C';
                    temperatureValue.textContent = Math.round(main.temp-273.15);
                }
            });
        });
        });
    }
    
});