import { Moon, Sun, Bell } from "lucide-react";
import { useState } from "react";

const TopNavbar = () => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Employee Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer text-gray-600 dark:text-gray-300" />

        <button
          onClick={toggleDark}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
        >
          {dark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
          SD
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;