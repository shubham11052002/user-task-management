function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className="task-item">
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-details">
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span>Due: {task.dueDate}</span>
        </div>
      </div>
      <div className="task-actions">
        <select
          aria-label="Task status"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button className="edit-button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
