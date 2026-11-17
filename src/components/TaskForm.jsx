import { useEffect, useState } from "react";

function TaskForm({ selectedTask, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || "");
      setPriority(selectedTask.priority);
      setDueDate(selectedTask.dueDate);
      setStatus(selectedTask.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setStatus("Pending");
    }
    setError("");
  }, [selectedTask]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    if (!dueDate) {
      setError("Please select a due date.");
      return;
    }
    onSave({
      id: selectedTask ? selectedTask.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      status,
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{selectedTask ? "Edit Task" : "Add New Task"}</h2>
      <label>Title *</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description (optional)"
        rows="3"
      />
      <div className="form-row">
        <div>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label>Due Date *</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
      <label>Status</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      {error && <p className="error">{error}</p>}
      <div className="form-buttons">
        <button className="primary-button" type="submit">
          {selectedTask ? "Update Task" : "Add Task"}
        </button>
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
