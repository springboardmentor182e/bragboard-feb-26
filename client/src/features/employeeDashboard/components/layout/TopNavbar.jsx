import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // 🔤 initials
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // 🚪 logout handler
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 👇 close on outside click
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

  return (
    <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center">

      {/* RIGHT SIDE ONLY (pushed using ml-auto) */}
      <div className="flex items-center gap-4 ml-auto">

        {/* 🔔 NOTIFICATION */}
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition">
          <Bell size={18} />
        </div>

        {/* 👤 PROFILE */}
        <div className="relative" ref={dropdownRef}>

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-lg transition"
          >

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold">
              {initials || "U"}
            </div>

            {/* INFO */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {user?.role || "employee"}
              </p>
            </div>

            <ChevronDown size={16} className="text-slate-500" />
          </div>

          {/* 🔽 DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">

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
    </div>
  );
};

export default TopNavbar;