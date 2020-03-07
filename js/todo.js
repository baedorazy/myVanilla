(function() {
    const todoForm = document.querySelector(".js-toDoForm"),
        toodInput = todoForm.querySelector("input"),
        todoUl = document.querySelector(".js-ul"),
        li = todoUl.querySelector("li");
    
    const TODOS_LS = 'toDos';
    let todos = [];
    
    
    function deleteTodo(event) {
        const btn = event.target;
        const li = btn.parentNode;
        todoUl.removeChild(li);
        
        const cleanToDos = todos.filter(function(toDo) {
            return toDo.id !== parseInt(li.id)
        });
        
        todos = cleanToDos;
        saveTodos();
        console.log(cleanToDos)
    }
    
    function saveTodos() {
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
})();
