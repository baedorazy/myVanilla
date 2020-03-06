const weather = document.querySelector(".js-weather");
const API_KEY = "a66e9151ec3c66f51f8d5e47d9ba75c2";
const COORDS = 'coords';

function getWeather(lat, lng) {
    const data = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    
    fetch(data)
        .then(function(response) {
            console.log();
            return response.json()
        }).then(function(json) {
            console.log(json);
            const temp = json.main.temp;
            const place = json.name;
            weather.innerText = `${temp} @ ${place}`
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    let loadedCoords = localStorage.getItem(COORDS);
    
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(localStorage.getItem(COORDS));
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();