import { Bell } from "lucide-react";

const AdminTopbar = () => {
  return (
    <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-200">

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <input
          type="text"
          placeholder="Search shout-outs, people, badges..."
          className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition">
          + Create Shout-Out
        </button>

        <Bell className="text-slate-600 cursor-pointer" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
            AC
          </div>
          <div>
            <p className="text-sm font-semibold">Alex Cooper</p>
            <p className="text-xs text-slate-500">Product Designer</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AdminTopbar;