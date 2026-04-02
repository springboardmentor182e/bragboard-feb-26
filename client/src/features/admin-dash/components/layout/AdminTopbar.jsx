import { Bell, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { adminAPI } from "../../../../services/api";

const AdminTopbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
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

  // 📊 Fetch pending count on load and refresh
  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const res = await adminAPI.getDashboardStats();
        setPendingCount(res.data?.pending_users || 0);
      } catch (error) {
        console.error("Error fetching pending:", error);
      }
    };

    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 300000); // Refresh every 5 minutes
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
    navigate("/admin/employees");
  };

  return (
    <header className="bg-white px-8 py-4 flex items-center justify-end border-b border-slate-200 shadow-sm">

      <div className="flex items-center gap-6">

        {/* 🔔 NOTIFICATION */}
        <div 
          className="relative cursor-pointer transition"
          onClick={handleNotificationClick}
          title={pendingCount > 0 ? `${pendingCount} pending approval(s)` : "No pending requests"}
        >
          <Bell 
            className={pendingCount > 0 ? "text-yellow-500 hover:text-yellow-600" : "text-slate-600 hover:text-slate-700"} 
            size={20} 
          />
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-pulse">
              {pendingCount > 9 ? "9+" : pendingCount}
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
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">

              {/* USER INFO */}
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.email}
                </p>
              </div>

              {/* ACTIONS */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default AdminTopbar;