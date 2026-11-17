function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Task Manager</h2>
      <nav>
        <a className="active" href="#tasks">
          Dashboard
        </a>
        <a href="#tasks">My Tasks</a>
      </nav>
      <p className="sidebar-note">Stay organized and get things done.</p>
    </aside>
  );
}

export default Sidebar;
