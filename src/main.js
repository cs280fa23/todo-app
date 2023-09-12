import "../style.css";
import TodoApp from "./TodoApp";

const app = new TodoApp();
window.addEventListener("DOMContentLoaded", () => app.init());
