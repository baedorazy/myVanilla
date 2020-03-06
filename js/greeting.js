const form = document.querySelector('.js-form'),
      input = form.querySelector("input"),
      h4 =  document.querySelector(".js-greetings");
        // querySelector는 찾은 첫번째 셀렉터를 가져오고
        // querySelectorAll은 모든걸 가져옴, 클래스명에 따른 엘리먼트를 가져오는데 array를 줌
        // array에서 하나의 엘리먼트 가져오는건 꽤나 귀찮어, 유일한 하나라고 해도 array안에 담아서줌.
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
        // 없으면 넣어줌
        //localStorage.setItem(currentUser, input.value)
        askForName();
        console.log('->', currentUser);
    } else {
        // 있으면 보여줌
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();
