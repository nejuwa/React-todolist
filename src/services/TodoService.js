// src/services/TodoService.js
const LOCAL_STORAGE_KEY = "srs_todos";

const TodoService = {
  getTodos() {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todoStr ? JSON.parse(todoStr) : [];
  },

  addTodo(text) {
    const todos = this.getTodos();
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.push(newTodo);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    return newTodo;
  },

  updateTodo(updatedTodo) {
    const todos = this.getTodos().map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  },

  deleteTodo(id) {
    const todos = this.getTodos().filter((todo) => todo.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  },
};

export default TodoService;
