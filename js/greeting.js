const form = document.querySelector('.js-form'),
      input = form.querySelector("input"),
      h4 =  document.querySelector(".js-greetings");


const USER_LS = "currentUser";
const SHOW_CLASSNAME = "show";
const HIDE_CLASSNAME = "hide";

function handleSubmit(e) {
    e.preventDefault();
    
    saveName(input.value);
    paintGreeting(input.value);
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function askForName() {
    form.classList.add(SHOW_CLASSNAME);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOW_CLASSNAME);
    h4.classList.add(SHOW_CLASSNAME);
    h4.innerHTML = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();
