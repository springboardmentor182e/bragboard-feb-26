import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role") || "user";

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        BragBoard
      </div>

      <ul className="flex-1 p-6 space-y-4">

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${isActive ? "bg-gray-600 text-white" : "hover:bg-indigo-500"
              }`
            }
          >
            Home
          </NavLink>
        </li>


        <Link to="/admin/shoutouts">
          Shoutouts
        </Link>


        {role === "admin" && (
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `block p-3 rounded-lg ${isActive ? "bg-gray-600 text-white" : "hover:bg-indigo-500"
                }`
              }
            >
              Admin Dashboard
            </NavLink>
          </li>
        )}

        {role === "admin" && (
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `block p-3 rounded-lg ${isActive ? "bg-gray-600 text-white" : "hover:bg-indigo-500"
                }`
              }
            >
              Manage Users
            </NavLink>
          </li>
        )}

      </ul>

      {role === "admin" && (
        <div className="p-6 border-t border-gray-700 space-y-3">

          {role === "admin" && (
            <NavLink
              to="/admin"
              className="block text-center bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
            >
              View Admin Dashboard
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const handleLogout = () => {
  localStorage.removeItem("role");
  window.location.href = "/";
};
export default Sidebar;