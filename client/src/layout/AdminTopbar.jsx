import { Bell, Search, Plus } from "lucide-react";
import { useState } from "react";
import CreateShoutoutModal from "../features/employeeDashboard/components/CreateShoutoutModal";

const AdminTopbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* CREATE BUTTON */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#5B59FF] text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all font-bold text-sm"
        >

          <Plus size={18} />

          Create Shout-Out

        </button>

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">

          <Bell className="text-slate-600" size={20} />

          {/* notification dot */}
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">

          {/* avatar */}
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
            AC
          </div>

          {/* user info */}
          <div className="flex flex-col leading-tight">

            <div className="flex items-center gap-2">

              <p className="text-sm font-bold text-slate-900">
                Alex Cooper
              </p>

              {/* level badge */}
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-orange-100 text-orange-600 font-black uppercase tracking-wider">
                Lv 4
              </span>

              {/* admin badge */}
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-[#5B59FF] font-black uppercase tracking-wider">
                Admin
              </span>

            </div>

            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Product Designer
            </p>

          </div>

        </div>

      </div>

      {/* Create Shout-Out Modal */}
      <CreateShoutoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
};

export default AdminTopbar;