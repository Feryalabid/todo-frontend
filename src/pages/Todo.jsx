// frontend/pages/Todo.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    const res = await axios.get(
      "https://todo-backend-production-b8d4.up.railway.app/api/todos"
    );
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const handleAdd = async () => {
    if (!task) return;
    await axios.post(
      "https://todo-backend-production-b8d4.up.railway.app/api/todos",
      { task }
    );
    setTask("");
    fetchTodos();
  };

  // Toggle completed
  const handleToggle = async (id) => {
    await axios.put(
      `https://todo-backend-production-b8d4.up.railway.app/api/todos/toggle/${id}`
    );
    fetchTodos();
  };

  // Delete todo
  const handleDelete = async (id) => {
    await axios.delete(
      `https://todo-backend-production-b8d4.up.railway.app/api/todos/${id}`
    );
    fetchTodos();
  };

  // Start edit
  const startEdit = (id, currentTask) => {
    setEditId(id);
    setEditTask(currentTask);
  };

  // Submit edit
  const handleEdit = async () => {
    await axios.put(
      `https://todo-backend-production-b8d4.up.railway.app/api/todos/edit/${editId}`,
      {
        task: editTask,
      }
    );
    setEditId(null);
    setEditTask("");
    fetchTodos();
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gradient-to-br from-[#243546] via-[#051e49] to-[#0e3e75] rounded shadow mt-35">
      <h2 className="text-2xl font-bold mb-4 text-center italic">ToDo App</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="flex-1 border border-gray-300 p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {editId === todo._id ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="flex-1 mr-2 border p-1 rounded"
                />
                <button
                  onClick={handleEdit}
                  className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.task}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(todo._id)}
                    className="bg-[#8025c0] px-3 py-1 rounded hover:bg-[#493656]"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => startEdit(todo._id, todo.task)}
                    className=" bg-cyan-600 px-3 py-1 rounded hover:bg-cyan-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="bg-neutral-300 text-red-700 px-3 py-1 rounded hover:bg-neutral-200"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
