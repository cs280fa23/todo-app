import "../style.css";

// Array to store our todos
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
  { id: 3, text: "Buy jam", completed: true },
];
let nextTodoId = 4;
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

// Function to handle adding a new todo
function handleNewTodoKeyDown(event) {
  if (event.key === 'Enter' && this.value.trim() !== '') {
    todos.push({ id: nextTodoId++, text: this.value, completed: false });
    this.value = ''; // clear the input
    renderTodos();
  }
}

const newTodoElement = document.getElementById('new-todo');
newTodoElement.addEventListener('keydown', handleNewTodoKeyDown);

// Function to handle marking a todo as completed
function handleTodoClick(event) {
  if (event.target.classList.contains('todo-text')) {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].text === event.target.textContent) {
        todos[i].completed = !todos[i].completed;
        break;
      }
    }
    renderTodos();
  }
}

const todoListElement = document.getElementById('todo-list');
todoListElement.addEventListener('click', handleTodoClick);

// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', renderTodos);