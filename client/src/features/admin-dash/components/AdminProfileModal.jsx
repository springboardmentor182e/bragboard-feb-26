import React from "react";
import { X, Shield } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const AdminProfileModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <>
      {/* DARK BACKDROP WITH BLUR */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* MODAL */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition z-10"
        >
          <X size={20} className="text-slate-500 dark:text-slate-400" />
        </button>

        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex flex-col items-center text-center">
            {/* AVATAR */}
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-3">
              {getInitials(user?.name)}
            </div>

            {/* NAME & ROLE */}
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-white/80 text-sm">Administrator</p>
            <p className="text-white/70 text-xs mt-1">
              {user?.department || "General"} • Member since {formatDate(user?.created_at)}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5">
          
          {/* ADMIN ACCESS BADGE */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 text-center border border-indigo-200 dark:border-indigo-800">
            <p className="text-slate-600 dark:text-slate-400 text-xs uppercase tracking-wide font-semibold">
              Access Level
            </p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
              Full Admin
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Email</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                @{user?.email?.split('@')[1]}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Department</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {user?.department || "General"}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
              <p className="text-sm font-bold text-green-600 dark:text-green-400">
                Active
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Member Since</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {formatDate(user?.created_at)}
              </p>
            </div>
          </div>

          {/* ADMIN CAPABILITIES */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Admin Capabilities
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Manage Employees",
                "View Reports",
                "Manage Shoutouts",
                "System Settings",
                "View Analytics",
                "Approve Users",
              ].map((capability, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full flex-shrink-0"></div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {capability}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PERMISSION INDICATOR */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <div className="flex items-center justify-center gap-2 text-center">
              <Shield size={16} className="text-indigo-600 dark:text-indigo-400" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                All System Permissions Granted
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileModal;
