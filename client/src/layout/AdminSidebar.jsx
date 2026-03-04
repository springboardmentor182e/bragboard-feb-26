import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Settings,
  BarChart2,
  Award,
  Home,
} from "lucide-react";

const AdminSidebar = () => {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  const active =
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg";

  const normal =
    "text-slate-300 hover:bg-white/10";

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#0E1625] text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          🏆
        </div>
        <span className="text-xl font-bold">BragBoard</span>
      </div>

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto p-6 space-y-6">

        <div className="space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <Home size={18} />
            Feed
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <Award size={18} />
            Leaderboard
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <BarChart2 size={18} />
            Analytics
          </NavLink>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider">
            Admin
          </p>

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <LayoutDashboard size={18} />
            Admin Dashboard
          </NavLink>

          <NavLink
            to="/admin/employees"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <Users size={18} />
            User Management
          </NavLink>

          <NavLink
            to="/admin/shoutouts"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <MessageSquare size={18} />
            Shout-Outs
          </NavLink>

          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <FileText size={18} />
            Reports
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `${base} ${isActive ? active : normal}`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 text-sm text-slate-400">
        Employee View
      </div>
    </aside>
  );
};

export default AdminSidebar;