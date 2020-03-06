
const todoForm = document.querySelector(".js-toDoForm"),
    toodInput = todoForm.querySelector("input"),
    todoUl = document.querySelector(".js-ul"),
    li = todoUl.querySelector("li");

const TODOS_LS = 'toDos';
let todos = [];

function filterFn(_todo) {
    return _todo.id === 1
}

function deleteTodo(event) {
    // console.dir(event.target);
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;

    todoUl.removeChild(li);
    
    // filter는 마치 forEach에서 function을 실해하는 것 같이 각각의 item과 같이 실행됨.
    // filters는 array의 모든 아이템을 통해 함수를 실행함 그리고 true인 아이템만 가지고 새로운 array를 만들고 ~
    // filter forEach 둘다 list에 있는 item을 위한 함수 실행 시
    const cleanToDos = todos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id)
    });
    
    todos = cleanToDos;
    saveTodos();
    console.log(cleanToDos)
    //console.log(event.target);
}

function saveTodos() {
    // localstorage는 string으로밖에 저장이 안되, 그래서 JSON.stringify를 사용험
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(_todo) {
    // setting
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todos.length + 1;
    deleteBtn.innerText = "x";
    deleteBtn.addEventListener("click", deleteTodo);
    span.innerText = _todo;
    li.id = newId;
    li.appendChild(deleteBtn);
    li.appendChild(span);
    todoUl.append(li);
    
    const todoObj = {
        text: _todo,
        id: newId
    };
    
    todos.push(todoObj);
    console.log(todoObj);
    saveTodos(todos);
}

function todoHandleSubmit(e) {
    e.preventDefault();

    const currentValue = toodInput.value;
    paintTodo(currentValue);
    toodInput.value = '';
}

function loadTodos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    
    if(loadedToDos !== null) {
        const parseTodos = JSON.parse(loadedToDos);
        parseTodos.forEach(function(el) {
            paintTodo(el.text)
        })
    } else {
        console.log("first null");
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", todoHandleSubmit);
}
init();