import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Trophy,
  Settings
} from "lucide-react";

export default function Sidebar() {

  const menuItem =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200";

  const activeItem =
    "bg-white text-purple-700 shadow";

  const normalItem =
    "text-purple-100 hover:bg-purple-600";

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-purple-700 to-purple-900 text-white flex flex-col">

      {/* Logo Section */}
      <div className="p-6 border-b border-purple-600">
        <h1 className="text-2xl font-bold tracking-wide">
          BragBoard
        </h1>
        <p className="text-xs text-purple-200">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : normalItem}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : normalItem}`
          }
        >
          <Users size={18} />
          Employees
        </NavLink>

        <NavLink
          to="/add-employee"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : normalItem}`
          }
        >
          <UserPlus size={18} />
          Add Employee
        </NavLink>

        <NavLink
          to="/recognition"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : normalItem}`
          }
        >
          <Trophy size={18} />
          Recognition Wall
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${menuItem} ${isActive ? activeItem : normalItem}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-purple-600 text-xs text-purple-600">
        © 2026 BragBoard
      </div>

    </div>
  );
}