import TodoList, { FILTERS } from "./TodoList.js";

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

    // Update todo count
    const activeTodoCount = this.todoList.getActiveTodoCount();
    document.getElementById(
      "todo-count",
    ).textContent = `${activeTodoCount} items left`;
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

  handleMarkAllCompletedClick() {
    this.todoList.markAllAsComplete();
    this.renderTodos();
  }

  handleClearCompletedClick() {
    this.todoList.clearCompleted();
    this.renderTodos();
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
    document
      .getElementById("mark-all-completed")
      .addEventListener("click", this.handleMarkAllCompletedClick.bind(this));
    document
      .getElementById("clear-completed")
      .addEventListener("click", this.handleClearCompletedClick.bind(this));

    this.renderTodos();
  }
}

export default TodoApp;
