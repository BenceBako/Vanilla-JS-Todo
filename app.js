// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todolist');
const filterOption = document.querySelector('#filtertodo');
// Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('change', filterTodo);

// Functions
function addTodo(event) {
    // Prevent form from submitting ->
        event.preventDefault();
    // Todo div creation after click ->
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    // Li creation inside of the Todo div ->
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
    // Add todo to localstorage
    saveLocalTodos(todoInput.value);
    // Completed task - check mark button ->
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    // Delete button and task ->
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    // Append to list ->
        todoList.appendChild(todoDiv);
    // Clear the input value ->
    todoInput.value = "";
};

function deleteTodo(event) {
    const item = event.target;
    // Delete todo with trash button ->
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
    // Animation of the delete ->
        todo.classList.add("fall");
    // Remove deleted item ->
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    };
 
    // Check a finished task ->
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
};

// Filtering ->
function filterTodo(event) {
    const todos = [...todoList.children];
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "status":
                todo.style.display = 'flex';
                break;
            case "important":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } 
                else {
                    todo.style.display = 'none';
                }
                break;
            case "notimportant":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                };
        };
    });
};

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}