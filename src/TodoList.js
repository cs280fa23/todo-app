import Todo from "./Todo";

export const FILTERS = {
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

  markAllAsComplete() {
    this.todos.forEach((todo) => (todo.completed = true));
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  getActiveTodoCount() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
}

export default TodoList;
