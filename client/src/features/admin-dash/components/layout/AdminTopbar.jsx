import { Bell, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { adminAPI } from "../../../../services/api";
import AdminProfileModal from "../AdminProfileModal";

const AdminTopbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [unresolvedReports, setUnresolvedReports] = useState(0);
  const dropdownRef = useRef();

  // 🔤 initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // 🚪 logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 📊 Fetch pending count and unresolved reports on load and refresh
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await adminAPI.getDashboardStats();
        setPendingUsers(res.data?.pending_users || 0);
        setUnresolvedReports(res.data?.unresolved_reports || 0);
        console.log("🔔 Notifications - Pending Users:", res.data?.pending_users, "Unresolved Reports:", res.data?.unresolved_reports);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Refresh every 30 seconds for real-time
    return () => clearInterval(interval);
  }, []);

  // 👇 close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    // If both exist, prioritize pending users, otherwise go to reports if they exist
    if (pendingUsers > 0) {
      navigate("/admin/employees");
    } else if (unresolvedReports > 0) {
      navigate("/admin/reports");
    }
  };

  // Calculate total notifications
  const totalNotifications = pendingUsers + unresolvedReports;

  return (
    <header className="bg-white px-8 py-4 flex items-center justify-end border-b border-slate-200 shadow-sm">

      <div className="flex items-center gap-6">

        {/* 🔔 NOTIFICATION */}
        <div 
          className="relative cursor-pointer transition"
          onClick={handleNotificationClick}
          title={
            totalNotifications > 0 
              ? `${pendingUsers} pending user(s) • ${unresolvedReports} unresolved report(s)` 
              : "No pending notifications"
          }
        >
          <Bell 
            className={totalNotifications > 0 ? "text-yellow-500 hover:text-yellow-600" : "text-slate-600 hover:text-slate-700"} 
            size={20} 
          />
          {totalNotifications > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-pulse">
              {totalNotifications > 9 ? "9+" : totalNotifications}
            </span>
          )}
        </div>

        {/* 👤 PROFILE + DROPDOWN */}
        <div className="relative" ref={dropdownRef}>

          {/* CLICK AREA */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 px-3 py-2 rounded-lg transition"
          >
            {/* avatar */}
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {getInitials(user?.name)}
            </div>

            {/* name + role */}
            <div className="flex flex-col leading-tight">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "User"}
              </p>

              <span className="text-xs text-slate-500 capitalize">
                {user?.role || "user"}
              </span>
            </div>

            <ChevronDown size={16} className="text-slate-500" />
          </div>

          {/* 🔽 DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">

              {/* USER INFO */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>

              {/* PROFILE LINK */}
              <button
                onClick={() => {
                  setProfileModalOpen(true);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition border-b border-slate-200 dark:border-slate-700"
              >
                <User size={16} />
                View Profile
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>

      {/* PROFILE MODAL */}
      <AdminProfileModal 
        isOpen={profileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
      />
    </header>
  );
};

export default AdminTopbar;