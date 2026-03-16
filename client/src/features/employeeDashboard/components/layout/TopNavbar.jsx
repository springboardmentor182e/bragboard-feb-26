import { Bell, Moon, Sun } from "lucide-react";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const TopNavbar = ({ selectedEmployee, dark, onToggleDark }) => {
  const initials = selectedEmployee
    ? getInitials(selectedEmployee.name)
    : "?";
  const displayName = selectedEmployee?.name ?? "No Employee Selected";

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm transition">

      {/* Left — Title */}
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        Employee Dashboard
      </h1>

      {/* Right — Actions */}
      <div className="flex items-center gap-4">

        {/* Bell */}
        <div className="relative cursor-pointer">
          <Bell className="text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Dark mode toggle — controlled by useDarkMode hook via parent */}
        <button
          onClick={onToggleDark}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {/* Employee Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-sm">
            {initials}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:block">
            {displayName}
          </span>
        </div>

      </div>
    </div>
  );
};

export default TopNavbar;