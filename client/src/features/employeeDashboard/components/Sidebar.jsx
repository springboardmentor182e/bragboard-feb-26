import { LayoutDashboard, Trophy, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", to: "/" },

  // Achievements
  { icon: <Trophy size={18} />, label: "Achievements", to: "/achievements" },

  // ✅ ADD THIS (Leaderboard)
  { icon: <Trophy size={18} />, label: "Leaderboard", to: "/leaderboard" },

  { icon: <User size={18} />, label: "Profile", to: "/profile" },
  { icon: <Settings size={18} />, label: "Settings", to: "/settings" },
];

const Sidebar = ({ selectedEmployee }) => {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={[
        "w-64 m-4 rounded-2xl",
        "bg-white/70 dark:bg-gray-900/70",
        "backdrop-blur-xl",
        "border border-gray-200 dark:border-gray-800",
        "shadow-xl dark:shadow-black/40",
        "h-[calc(100vh-2rem)]",
        "hidden md:flex flex-col",
      ].join(" ")}
    >
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          BragBoard
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Selected Employee */}
      {selectedEmployee && (
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-semibold">
              {selectedEmployee.name?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {selectedEmployee.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedEmployee.department}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`
    }
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default Sidebar;