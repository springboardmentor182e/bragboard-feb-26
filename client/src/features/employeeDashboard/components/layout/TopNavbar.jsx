import { Bell } from "lucide-react";
import { useState } from "react";
import CreateShoutoutModal from "../modals/CreateShoutoutModal";

const TopNavbar = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-end shadow-sm">

        <div className="flex items-center gap-5">

          {/* NOTIFICATION */}
          <div className="relative cursor-pointer hover:opacity-80 transition">
            <Bell className="text-slate-500" size={20} />

            {/* notification dot */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          {/* USER */}
          <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-lg transition">

            {/* avatar */}
            <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
              AC
            </div>

            {/* user info */}
            <div className="text-sm leading-tight">
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