import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react";

const AdminSidebar = () => {
  const base =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  const active =
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg";

  const normal = "text-slate-300 hover:bg-white/10 hover:text-white";

  const linkClass = ({ isActive }) =>
    `${base} ${isActive ? active : normal}`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#0E1625] text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-lg">
          🏆
        </div>
        <span className="text-xl font-bold">BragBoard</span>
      </div>

      {/* Admin Navigation ONLY */}
      <nav className="flex-1 overflow-y-auto p-6 space-y-2">

        <NavLink to="/admin/dashboard" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/employees" className={linkClass}>
          <Users size={18} />
          User Management
        </NavLink>

        <NavLink to="/admin/shoutouts" className={linkClass}>
          <MessageSquare size={18} />
          Shout-Outs
        </NavLink>

        <NavLink to="/admin/reports" className={linkClass}>
          <FileText size={18} />
          Reports
        </NavLink>

        <NavLink to="/admin/settings" className={linkClass}>
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10 text-sm text-slate-400">
        Admin Panel
      </div>
    </aside>
  );
};

export default AdminSidebar;