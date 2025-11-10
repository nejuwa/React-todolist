import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoService from "./services/TodoService";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedUser) setUser(loggedUser);

    if (loggedUser) {
      setTodos(TodoService.getTodos());
    }
  }, []);

  const handleAdd = (text) => {
    const newTodo = TodoService.addTodo(text);
    setTodos([...todos, newTodo]);
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    updatedTodos.forEach((t) => TodoService.updateTodo(t));
  };

  const handleDelete = (id) => {
    TodoService.deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  // If user not logged in → show Auth component
  if (!user) return <Auth onLogin={setUser} />;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        
      <h1 className="text-primary text-center w-100">
  📘 Welcome, {user.username || user.email.split("@")[0]}’s To-do-list</h1>

        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}

export default App;
