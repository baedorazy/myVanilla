const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('h1');

function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    clockTitle.innerHTML =
        `${hour < 10 ? `0${hour}` : hour }:
         ${minutes < 10 ? `0${minutes}` : minutes}:
         ${seconds < 10 ? `0${seconds}` : seconds }`
}
function init() {
    getTime();
}

setInterval( getTime, 1000);
init();