import React from "react";
import { X, Mail, Briefcase, Shield, Calendar } from "lucide-react";
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
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-6 flex items-start justify-between">
            <div className="text-white">
              <h2 className="text-2xl font-bold">Admin Profile</h2>
              <p className="text-indigo-100 text-sm mt-1">Administrator Details</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* ADMIN INFO HEADER */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {user.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                  <Shield size={16} /> Full Administrator
                </p>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* EMAIL */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-indigo-600" />
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Email
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 break-all">
                  {user.email}
                </p>
              </div>

              {/* DEPARTMENT */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={16} className="text-indigo-600" />
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Department
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {user.department || "General"}
                </p>
              </div>

              {/* ROLE */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-indigo-600" />
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Role
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {user.role || "Administrator"}
                </p>
              </div>

              {/* MEMBER SINCE */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-indigo-600" />
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                    Member Since
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {formatDate(user.created_at)}
                </p>
              </div>
            </div>

            {/* STATUS INDICATORS */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Account Status: Active
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Access Level: Full Admin
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Permissions: All Systems
                </span>
              </div>
            </div>

            {/* ADMIN PERMISSIONS */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">
                Admin Capabilities
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Manage Employees",
                  "View Reports",
                  "Manage Shoutouts",
                  "System Settings",
                  "View Analytics",
                  "Approve Users",
                ].map((permission, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileModal;
