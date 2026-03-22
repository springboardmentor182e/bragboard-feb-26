import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Settings,
  BarChart2,
  Award,
  Home,
  Trophy,
  Shield,
  Heart,
} from "lucide-react";

const AdminSidebar = () => {
  const [view, setView] = useState("employee"); // "employee" or "admin"

  const base =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200";

  const active =
    "bg-[#5B59FF] text-white shadow-lg";

  const normal = "text-slate-300 hover:bg-white/10 hover:text-white";

  const linkClass = ({ isActive }) =>
    `${base} ${isActive ? active : normal}`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#0B1220] via-[#0F172A] to-[#0E1625] text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-[#5B59FF] rounded-xl flex items-center justify-center text-white">
          <Trophy size={24} fill="white" />
        </div>
        <span className="text-xl font-bold">BragBoard</span>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">

        {/* Main Navigation */}
        <div className="space-y-2">
          <NavLink to="/" className={linkClass}>
            <Home size={18} />
            Feed
          </NavLink>

          <NavLink to="/leaderboard" className={linkClass}>
            <Trophy size={18} />
            Leaderboard
          </NavLink>

          <NavLink to="/team" className={linkClass}>
            <Users size={18} />
            Team
          </NavLink>

          <NavLink to="/badges" className={linkClass}>
            <Award size={18} />
            Badges
          </NavLink>

          <NavLink to="/analytics" className={linkClass}>
            <BarChart2 size={18} />
            Analytics
          </NavLink>

          {view === "employee" && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>

              <NavLink 
                to="/my-shoutouts" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold transition-all mt-4 ${
                    isActive 
                      ? "bg-[#5B59FF] text-white shadow-lg shadow-indigo-500/20" 
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Heart size={20} className={isActive ? "fill-white" : ""} />
                    My Shout-Outs
                  </>
                )}
              </NavLink>
            </>
          )}
        </div>

        {/* Admin Section */}
        {view === "admin" && (
          <div className="border-t border-white/10 pt-6 animate-fadeIn">
            <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold px-4">
              Admin
            </p>

            <div className="space-y-2">
              <NavLink to="/admin/dashboard" className={linkClass}>
                <Shield size={18} />
                Admin Dashboard
              </NavLink>

              <NavLink to="/admin/shoutouts" className={linkClass}>
                <MessageSquare size={18} />
                Shout-Outs
              </NavLink>

              <NavLink to="/admin/reports" className={linkClass}>
                <FileText size={18} />
                Reports
              </NavLink>

              <NavLink to="/admin/employees" className={linkClass}>
                <Users size={18} />
                User Management
              </NavLink>

              <NavLink to="/admin/settings" className={linkClass}>
                <Settings size={18} />
                Settings
              </NavLink>
            </div>
          </div>
        )}

      </nav>

      {/* Footer Toggle Button */}
      <div className="p-6 border-t border-white/10 mt-auto">
        <button 
          onClick={() => setView(view === "employee" ? "admin" : "employee")}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 transition-all border border-white/5 font-medium"
        >
          <Shield size={18} />
          {view === "employee" ? "Admin View" : "Employee View"}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;