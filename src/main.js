import "../style.css";

// Array to store our todos
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
];
let nextTodoId = 3;
let filter = "all"; // can be 'all', 'active', or 'completed'

// Function to render the todos based on the current filter
function renderTodos() {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = ''; // clear the current list

  let filteredTodos = [];
  for (let i = 0; i < todos.length; i++) {
    if (filter === 'all') {
      filteredTodos.push(todos[i]);
    } else if (filter === 'active' && !todos[i].completed) {
      filteredTodos.push(todos[i]);
    } else if (filter === 'completed' && todos[i].completed) {
      filteredTodos.push(todos[i]);
    }
  }

  // Loop through the filtered todos and add them to the DOM
  for (let i = 0; i < filteredTodos.length; i++) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('p-4', 'todo-item');

    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoText.textContent = filteredTodos[i].text;
    if (filteredTodos[i].completed) {
      todoText.style.textDecoration = 'line-through';
    }

    const todoEdit = document.createElement('input');
    todoEdit.classList.add('hidden', 'todo-edit');
    todoEdit.value = filteredTodos[i].text;

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoEdit);
    todoListElement.appendChild(todoItem);
  }
}