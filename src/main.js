import "../style.css";

// Array to store our todos
const todos = [
  { id: 1, text: "Buy milk", completed: false },
  { id: 2, text: "Buy bread", completed: false },
];
let nextTodoId = 3;
let filter = "all"; // can be 'all', 'active', or 'completed'
