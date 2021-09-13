'use strict';

window.addEventListener('load', () => {
    let longit = null;
    let latet = null;
    const timezone = document.querySelector('.location-timezone'),
        temperatureValue = document.querySelector('.tempeature-value'),
        valueSection = document.querySelector('.value-section'),
        description = document.querySelector('.temperature-description'),
        locationClass = document.querySelector('.location'),
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

            const api = `http://api.weatherapi.com/v1/current.json?key=b16d149a0f7540f989b190424210909&q=56.7923,  60.63&aqi=no`;

            fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {current, location} = data;

            timezone.textContent = location.tz_id;
            temperatureValue.textContent = current.temp_c;
            description.textContent = current.condition.text.toUpperCase();
            console.log(current.condition.icon);
            locationClass.insertAdjacentHTML(`beforeend`, `<img src='${current.condition.icon}'/>`);
            valueSection.addEventListener('click', () => {
                if(degree.textContent === '°C') {
                    degree.textContent = '°F';
                    temperatureValue.textContent = current.temp_f;
                } else {
                    degree.textContent = '°C';
                    temperatureValue.textContent = current.temp_c;
                }
            });
        });
        });
    }
    
});