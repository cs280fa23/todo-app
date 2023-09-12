import "../style.css";

class Todo {
  static nextId = 1;

  constructor(text) {
    this.id = Todo.nextId++;
    this.text = text;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(text) {
    const todo = new Todo(text);
    this.todos.push(todo);
  }

  // pre: todos' text are unique
  toggleTodo(todoText) {
    const todo = this.todos.find((t) => t.text === todoText);
    if (todo) {
      todo.toggle();
    }
  }

  getVisibleTodos(filter) {
    switch (filter) {
      case FILTERS.ACTIVE:
        return this.todos.filter((todo) => !todo.completed);
      case FILTERS.COMPLETED:
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }
}

class TodoApp {
  constructor() {
    this.todoList = new TodoList();
    this.filter = FILTERS.ALL;
  }

  renderTodos() {
    const visibleTodos = this.todoList.getVisibleTodos(this.filter);
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = "";

    visibleTodos.forEach((todo) => {
      const todoElement = document.createElement("div");
      todoElement.className = "p-4 todo-item";
      const todoText = document.createElement("div");
      todoText.className = "todo-text";
      todoText.textContent = todo.text;
      if (todo.completed) {
        todoText.style.textDecoration = "line-through";
      }
      todoElement.appendChild(todoText);
      todoListElement.appendChild(todoElement);
    });
  }

  setFilter(newFilter) {
    this.filter = newFilter;
  }

  updateFilterStyles(selectedFilter) {
    const filters = document.querySelectorAll("#todo-nav a");
    filters.forEach((filter) => {
      filter.classList.remove(
        "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
      );
    });
    selectedFilter.classList.add(
      "underline",
      "underline-offset-4",
      "decoration-rose-800",
      "decoration-2",
    );
  }

  handleNewTodoKeyDown(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      this.todoList.addTodo(event.target.value.trim());
      event.target.value = "";
      this.renderTodos();
    }
  }

  handleTodoClick(event) {
    if (event.target.classList.contains("todo-text")) {
      this.todoList.toggleTodo(event.target.textContent);
      this.renderTodos();
    }
  }

  handleFilterClick(event) {
    if (event.target.tagName === "A") {
      const newFilter =
        event.target.getAttribute("href").slice(2) || FILTERS.ALL;
      this.setFilter(newFilter);
      this.renderTodos();
      this.updateFilterStyles(event.target);
    }
  }

  init() {
    document
      .getElementById("new-todo")
      .addEventListener("keydown", this.handleNewTodoKeyDown.bind(this));
    document
      .getElementById("todo-list")
      .addEventListener("click", this.handleTodoClick.bind(this));
    document
      .getElementById("todo-nav")
      .addEventListener("click", this.handleFilterClick.bind(this));

    this.renderTodos();
  }
}