import { Bell, Plus } from "lucide-react";
import { useState } from "react";
import CreateShoutoutModal from "../modals/CreateShoutoutModal";

const TopNavbar = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search shout-outs, people, badges..."
          className="w-1/3 px-4 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* CREATE BUTTON */}
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
          >
            <Plus size={16} />
            Create Shout-Out
          </button>

          {/* NOTIFICATION */}
          <Bell className="text-slate-500 cursor-pointer" />

          {/* USER */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center">
              AC
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-900">Alex Cooper</p>
              <p className="text-xs text-slate-500">Product Designer</p>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      <CreateShoutoutModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default TopNavbar;