import {
  LayoutDashboard,
  Trophy,
  Users,
  Award,
  Heart,
  ShieldCheck,
  FileText,
  Settings,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // 👤 EMPLOYEE MENU
  const employeeMenu = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/" },
    { label: "My Shout-Outs", icon: <Heart size={18} />, path: "/my-shoutouts" },
    { label: "Leaderboard", icon: <Trophy size={18} />, path: "/leaderboard" },
    { label: "Team", icon: <Users size={18} />, path: "/team" },
    { label: "Badges", icon: <Award size={18} />, path: "/badges" },
    { label: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  // 👑 ADMIN MENU
  const adminMenu = [
    { label: "Admin Dashboard", icon: <ShieldCheck size={18} />, path: "/admin/dashboard" },
    { label: "Employees", icon: <Users size={18} />, path: "/admin/employees" },
    { label: "Reports", icon: <FileText size={18} />, path: "/admin/reports" },
  ];

  // 🔥 ROLE SWITCH
  const menu = user?.role === "admin" ? adminMenu : employeeMenu;

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col border-r border-white/5">

      {/* LOGO */}
      <div className="px-6 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          🏆
        </div>
        <span className="text-lg font-semibold tracking-wide">
          BragBoard
        </span>
      </div>

      {/* ROLE LABEL (NEW 🔥) */}
      <div className="px-6 pt-4 text-xs uppercase text-white/40 tracking-wider">
        {user?.role === "admin" ? "Admin Panel" : "Employee Panel"}
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-2">

        {menu.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}

      </nav>

      {/* USER INFO FOOTER (NEW 🔥) */}
      <div className="p-4 border-t border-white/10 text-xs text-white/50">
        Logged in as <span className="text-white">{user?.name || "User"}</span>
      </div>

    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        group relative flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
            : "text-white/70 hover:text-white hover:bg-white/10"
        }
      `}
    >

      {/* Active Glow */}
      {active && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-md -z-10"></div>
      )}

      {/* ICON */}
      <div className="transition group-hover:scale-110">
        {icon}
      </div>

      {/* TEXT */}
      <span className="tracking-wide">{label}</span>

    </div>
  );
};

export default Sidebar;