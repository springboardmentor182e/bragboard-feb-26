import { LayoutDashboard, Trophy, User, Settings } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 m-4 rounded-2xl 
                 bg-white/70 dark:bg-gray-900/70 
                 backdrop-blur-xl 
                 border border-gray-200 dark:border-gray-800
                 shadow-xl dark:shadow-black/40 
                 h-[calc(100vh-2rem)] 
                 flex flex-col"
    >
      <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          BragBoard
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
        <SidebarItem icon={<Trophy size={18} />} label="Achievements" />
        <SidebarItem icon={<User size={18} />} label="Profile" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </nav>
    </motion.div>
  );
};

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
        active
          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default Sidebar;