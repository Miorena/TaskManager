import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Charger les tâches au démarrage
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  const addTask = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.post("/tasks", { title: input });
      setTasks([...tasks, response.data]);
      setInput("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleTask = async (id, isDone) => {
    try {
      await axios.patch(`/tasks/${id}`, { isDone: !isDone });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isDone: !isDone } : task,
        ),
      );
    } catch (err) {
      console.error("Error toogling taks:", err);
    }
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;

    try {
      await axios.patch(`/tasks/${id}`, { title: editingText });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: editingText } : task,
        ),
      );
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Task Manager</h1>

        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.isDone ? "done" : ""}`}
            >
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => toggleTask(task.id, task.isDone)}
              />

              {editingId === task.id ? (
                // Mode édition
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit(task.id)}
                    autoFocus
                  />
                  <button
                    className="save-btn"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEditing}>
                    Cancel
                  </button>
                </>
              ) : (
                // Mode normal
                <>
                  <span className="task-text">{task.title}</span>
                  <button
                    className="edit-btn"
                    onClick={() => startEditing(task.id, task.title)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
