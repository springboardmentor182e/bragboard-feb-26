import { Bell, Settings, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">

      {/* Left Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Welcome back, Admin
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Search Box */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search employees..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Notification */}
        <button className="relative text-gray-600 hover:text-purple-600 transition">

          <Bell size={20} />

          {/* Notification Badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>

        </button>

        {/* Settings */}
        <button className="text-gray-600 hover:text-purple-600 transition">
          <Settings size={20} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full border"
          />

          <span className="text-sm font-medium text-gray-700">
            Admin
          </span>

        </div>

      </div>

    </div>
  );
}

export default Navbar;