import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ConfirmModal from "./ConfirmModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // États pour le modal
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    cancelText: "Cancel",
    type: "warning",
  });

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
      console.error("Error toggling task:", err);
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

  const deleteTask = (id) => {
    setModalConfig({
      isOpen: true,
      title: "Delete Task",
      message:
        "Are you sure you want to delete this task? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "danger",
      onConfirm: async () => {
        try {
          await axios.delete(`/tasks/${id}`);
          setTasks(tasks.filter((task) => task.id !== id));
          closeModal();
        } catch (err) {
          console.error("Error deleting task:", err);
          alert("Error deleting task. Please try again.");
          closeModal();
        }
      },
    });
  };

  const deleteAllTasks = () => {
    const tasksToDelete = getFilteredTasks();

    if (tasksToDelete.length === 0) {
      setModalConfig({
        isOpen: true,
        title: "No Tasks",
        message: "There are no tasks to delete!",
        confirmText: "OK",
        type: "info",
        onConfirm: () => closeModal(),
      });
      return;
    }

    const filterText = filter === "all" ? "all" : filter;

    setModalConfig({
      isOpen: true,
      title: "Delete Multiple Tasks",
      message: `Are you sure you want to delete ${filterText === "all" ? "ALL" : "all " + filterText} tasks (${tasksToDelete.length} total)? This action cannot be undone.`,
      confirmText: `Delete ${tasksToDelete.length} task${tasksToDelete.length > 1 ? "s" : ""}`,
      cancelText: "Cancel",
      type: "danger",
      onConfirm: async () => {
        try {
          await Promise.all(
            tasksToDelete.map((task) => axios.delete(`/tasks/${task.id}`)),
          );

          const remainingTasks = tasks.filter(
            (task) => !tasksToDelete.find((t) => t.id === task.id),
          );
          setTasks(remainingTasks);
          closeModal();
        } catch (err) {
          console.error("Error deleting tasks:", err);
          loadTasks();
          alert(
            "Some tasks could not be deleted. The list has been refreshed.",
          );
          closeModal();
        }
      },
    });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.isDone);
      case "completed":
        return tasks.filter((task) => task.isDone);
      default:
        return tasks;
    }
  };

  const getSortedTasks = (tasksToSort) => {
    const sorted = [...tasksToSort];

    switch (sortBy) {
      case "title":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "status":
        return sorted.sort((a, b) => a.isDone - b.isDone);
      case "date":
      default:
        return sorted.sort((a, b) => a.id - b.id);
    }
  };

  const displayedTasks = getSortedTasks(getFilteredTasks());

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isDone).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <div className="App">
      <ConfirmModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        type={modalConfig.type}
      />

      <div className="container">
        <h1>Task Manager</h1>

        <div className="stats">
          <span className="stat">Total: {totalTasks}</span>
          <span className="stat">Active: {activeTasks}</span>
          <span className="stat">Completed: {completedTasks}</span>
        </div>

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

        <div className="controls">
          <div className="filters">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <div className="controls-right">
            <div className="sort">
              <label>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Date Created</option>
                <option value="title">Title (A-Z)</option>
                <option value="status">Status</option>
              </select>
            </div>

            <button
              className="delete-all-btn"
              onClick={deleteAllTasks}
              disabled={displayedTasks.length === 0}
            >
              Delete All
            </button>
          </div>
        </div>

        <ul className="task-list">
          {displayedTasks.length === 0 ? (
            <div className="empty-state">
              {filter === "active" && "No active tasks! 🎉"}
              {filter === "completed" && "No completed tasks yet"}
              {filter === "all" && "No tasks yet. Add one to get started!"}
            </div>
          ) : (
            displayedTasks.map((task) => (
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
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
