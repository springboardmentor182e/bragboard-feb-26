import { Bell } from "lucide-react";

const AdminTopbar = () => {
  return (
    <header className="bg-white px-8 py-4 flex items-center justify-end border-b border-slate-200 shadow-sm">

      <div className="flex items-center gap-6">

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer hover:opacity-80 transition">
          <Bell className="text-slate-600" size={20} />

          {/* notification dot */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-lg transition">

          {/* avatar */}
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            AC
          </div>

          {/* user info */}
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">

              <p className="text-sm font-semibold text-slate-900">
                Alex Cooper
              </p>

              <span className="text-xs px-2 py-0.5 rounded-md bg-orange-100 text-orange-600 font-medium">
                Lv 4
              </span>

              <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-600 font-medium">
                Admin
              </span>

            </div>

            <p className="text-xs text-slate-500">
              Product Designer
            </p>
          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminTopbar;