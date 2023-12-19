import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Expenses Analyzer</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link href="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Expenses</div>

        <li className="nav-item">
          <Link href="/dashboard/expenses/add" className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Add new Expenses</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link href="/dashboard/expenses/view" className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>View all Expenses</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Visualize</div>

        <li className="nav-item">
          <Link href="/dashboard/charts" className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Charts</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          {/* TODO: enable sidebar toggle */}
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
