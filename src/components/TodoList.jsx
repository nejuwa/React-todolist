import React from "react";

function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p className="text-center">No tasks yet.</p>;

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`card mb-2 ${todo.completed ? "border-success" : ""}`}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <span className={todo.completed ? "text-decoration-line-through" : ""}>
              {todo.text}
            </span>
            <div className="d-flex gap-2">
              <button
                className={`btn btn-${todo.completed ? "warning" : "success"} btn-sm`}
                onClick={() => onToggle(todo.id)}
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(todo.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
