import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Expenses Analyzer</div>
        </Link>

        <hr className="sidebar-divider my-4" />

        <div className="sidebar-heading">Participants</div>

        <li className="nav-item">
          <Link href="/participants" className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Manage Participants</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Households</div>

        <li className="nav-item">
          <Link href="/households" className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Manage Households</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Expenses</div>

        <li className="nav-item">
          <Link href="/expenses" className="nav-link">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Manage Expenses</span>
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
