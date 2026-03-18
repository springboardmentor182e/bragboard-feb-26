import { NavLink } from "react-router-dom";

const linkClasses =
  "block px-3 py-2 rounded-lg transition hover:bg-softBrown hover:text-white";

const Sidebar = () => {
  return (
    <div className="w-64 bg-sidebar p-6 shadow-md">
      <h1 className="text-2xl font-bold text-softBrown mb-10">
        BragBoard
      </h1>

      <nav className="space-y-4 text-darkText font-medium">
        <NavLink to="/employee" className={linkClasses}>
          Dashboard
        </NavLink>

        <NavLink
  to="/employee/recognition"
  className={({ isActive }) =>
    `block px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-softBrown text-white"
        : "hover:bg-softBrown hover:text-white"
    }`
  }
>
  Recognition
</NavLink>

        <NavLink to="/employee/badges" className={linkClasses}>
          My Badges
        </NavLink>

        <NavLink to="/employee/profile" className={linkClasses}>
          My Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;