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