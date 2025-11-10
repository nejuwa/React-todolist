import React, { useState } from "react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter documentation task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary w-100">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
