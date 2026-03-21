import { useState, useEffect } from "react";
import { Bell, Moon, Sun } from "lucide-react";

const TopNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm transition">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        Employee Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer" />

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition"
        >
          {darkMode ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
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