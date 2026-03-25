import {
  LayoutDashboard,
  Trophy,
  Users,
  Award,
  BarChart3,
  Heart,
  Plus,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/",
    },
    {
      label: "Create Shout-Out",
      icon: <Plus size={18} />,
      path: "/create-shoutout",
    },
    {
      label: "My Shout-Outs",
      icon: <Heart size={18} />,
      path: "/my-shoutouts",
    },
    {
      label: "Leaderboard",
      icon: <Trophy size={18} />,
      path: "/leaderboard",
    },
    {
      label: "Team",
      icon: <Users size={18} />,
      path: "/team",
    },
    {
      label: "Badges",
      icon: <Award size={18} />,
      path: "/badges",
    },
    {
      label: "Analytics",
      icon: <BarChart3 size={18} />,
      path: "/analytics",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white flex flex-col">

      {/* LOGO */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          🏆
        </div>
        <span className="text-lg font-semibold">BragBoard</span>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-4 py-6 space-y-2">

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

      {/* ADMIN BUTTON */}
      <div className="p-4">
        <button
          onClick={() => navigate("/admin/employees")}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-sm py-2.5 rounded-xl transition"
        >
          <span>Admin View</span>
        </button>
      </div>

    </div>
  );
};


const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all
        ${
          active
            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
            : "text-white/70 hover:bg-white/10"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Sidebar;