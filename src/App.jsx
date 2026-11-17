import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function getSavedTasks() {
  try {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) return [];
    const parsedTasks = JSON.parse(savedTasks);
    return Array.isArray(parsedTasks) ? parsedTasks : [];
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(getSavedTasks);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("earliest");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function saveTask(task) {
    if (selectedTask) {
      setTasks(tasks.map((item) => (item.id === task.id ? task : item)));
    } else {
      setTasks([...tasks, task]);
    }
    setShowForm(false);
    setSelectedTask(null);
  }

  function editTask(task) {
    setSelectedTask(task);
    setShowForm(true);
  }

  function deleteTask(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  }

  function changeStatus(id, status) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  }

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => statusFilter === "All" || task.status === statusFilter)
    .filter(
      (task) => priorityFilter === "All" || task.priority === priorityFilter,
    )
    .sort((a, b) =>
      sortOrder === "earliest"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate),
    );

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Header />
        <SummaryCards tasks={tasks} />
        <section className="tasks-section" id="tasks">
          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Here are all your tasks.</p>
            </div>
            <button
              className="primary-button"
              onClick={() => {
                setSelectedTask(null);
                setShowForm(true);
              }}
            >
              + Add Task
            </button>
          </div>
          <div className="filters">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="earliest">Due Date: Earliest</option>
              <option value="latest">Due Date: Latest</option>
            </select>
          </div>
          <TaskList
            tasks={filteredTasks}
            allTasksExist={tasks.length > 0}
            onEdit={editTask}
            onDelete={deleteTask}
            onStatusChange={changeStatus}
          />
        </section>
      </main>
      {showForm && (
        <div className="modal-background">
          <div className="modal">
            <TaskForm
              selectedTask={selectedTask}
              onSave={saveTask}
              onCancel={() => {
                setShowForm(false);
                setSelectedTask(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
