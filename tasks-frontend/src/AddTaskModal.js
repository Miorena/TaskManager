import { useState } from "react";
import "./AddTaskModal.css";

function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="add-modal-overlay" onClick={handleCancel}>
      <div className="add-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="add-modal-title">New Task</h2>

        <input
          type="text"
          className="add-modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What needs to be done?"
          autoFocus
        />

        <div className="add-modal-buttons">
          <button className="add-modal-btn cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="add-modal-btn confirm"
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Add Task
          </button>
        </div>

        <p className="add-modal-hint">Press Enter to add, Esc to cancel</p>
      </div>
    </div>
  );
}

export default AddTaskModal;
