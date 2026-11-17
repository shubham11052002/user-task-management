function SummaryCards({ tasks }) {
  const total = tasks.length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const progress = tasks.filter((task) => task.status === "In Progress").length;
  const completed = tasks.filter((task) => task.status === "Completed").length;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <p>Total Tasks</p>
        <h2>{total}</h2>
      </div>
      <div className="summary-card">
        <p>Pending</p>
        <h2>{pending}</h2>
      </div>
      <div className="summary-card">
        <p>In Progress</p>
        <h2>{progress}</h2>
      </div>
      <div className="summary-card">
        <p>Completed</p>
        <h2>{completed}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;
