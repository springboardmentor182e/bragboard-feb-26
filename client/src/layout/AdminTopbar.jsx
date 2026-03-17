import { Bell, Search, Plus } from "lucide-react";

const AdminTopbar = () => {
  return (
    <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-slate-200">

      {/* SEARCH */}
      <div className="flex-1 max-w-xl relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search shout-outs, people, badges..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* CREATE BUTTON */}
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow hover:opacity-90 transition">

          <Plus size={18} />

          Create Shout-Out

        </button>

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">

          <Bell className="text-slate-600" size={20} />

          {/* notification dot */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3">

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

              {/* level badge */}
              <span className="text-xs px-2 py-0.5 rounded-md bg-orange-100 text-orange-600 font-medium">
                Lv 4
              </span>

              {/* admin badge */}
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