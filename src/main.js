import "../style.css";

// Factory function to create a new todo app
function createTodoApp() {
  let todos = [];
  let nextTodoId = 1;
  let filter = "all"; // possible values: 'all', 'active', 'completed'

  // Add a new todo to the list
  function addTodo(text) {
    todos = [...todos, { id: nextTodoId++, text, completed: false }];
  }

  // Toggle the completed state of a todo
  function toggleTodo(todoText) {
    todos = todos.map((todo) =>
      todo.text === todoText ? { ...todo, completed: !todo.completed } : todo,
    );
  }

  // Set the current filter
  function setFilter(newFilter) {
    filter = newFilter;
  }

  // Get the todos based on the current filter
  function getVisibleTodos() {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  // Return the public interface
  return {
    addTodo,
    toggleTodo,
    setFilter,
    getVisibleTodos,
  };
}

// Create a new todo app
const todoApp = createTodoApp();

// Function to render the todos based on the current filter
function renderTodos() {
  const todoListElement = document.getElementById('todo-list');
  todoListElement.innerHTML = ''; // clear the current list

  const filteredTodos = todoApp.getVisibleTodos();

  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('p-4', 'todo-item');

    const todoText = document.createElement('div');
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.style.textDecoration = 'line-through';
    }

    const todoEdit = document.createElement('input');
    todoEdit.classList.add('hidden', 'todo-edit');
    todoEdit.value = todo.text;

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoEdit);
    todoListElement.appendChild(todoItem);
  })
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


// Function to handle changing the filter
function handleFilterClick(event) {
  if (event.target.tagName === 'A') {
    const hrefValue = event.target.getAttribute('href').slice(2);
    filter = hrefValue === '' ? 'all' : hrefValue;
    renderTodos();
  }
}

const todoNavElement = document.getElementById('todo-nav');
todoNavElement.addEventListener('click', handleFilterClick);

// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', renderTodos);