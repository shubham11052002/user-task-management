import TaskItem from "./TaskItem";

function TaskList({ tasks, allTasksExist, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return <div className="empty-state">
      <h3>{allTasksExist ? "No tasks found" : "No tasks yet"}</h3>
      <p>{allTasksExist ? "Try changing your search or filters." : "Add your first task to get started."}</p>
    </div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}

export default TaskList;
