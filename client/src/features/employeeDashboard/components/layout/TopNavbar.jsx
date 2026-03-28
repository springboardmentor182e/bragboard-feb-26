import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
const TopNavbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">

      {/* LEFT */}
      <div>
        <h1 className="text-lg font-semibold text-slate-800">
          Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer">
          <Bell size={18} />
        </div>

        {/* PROFILE */}
        <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer"
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

            <ChevronDown size={16} />
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-2">

              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
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