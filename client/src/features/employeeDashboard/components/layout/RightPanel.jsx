import { Plus, MessageSquare, Trophy, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateShoutoutModal from "../modals/CreateShoutoutModal";

const RightPanel = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="space-y-6">

        {/* CREATE SHOUTOUT */}
        <div
          onClick={() => setOpenModal(true)}
          className="
            bg-white rounded-2xl p-5
            border border-slate-200
            shadow-sm hover:shadow-md
            transition-all duration-300
            cursor-pointer hover:-translate-y-1
          "
        >
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Plus size={20} />
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                Create Shout-Out
              </p>
              <p className="text-sm text-slate-500">
                Recognize a teammate
              </p>
            </div>

          </div>
        </div>

        {/* MY SHOUTOUTS */}
        <div
          onClick={() => navigate("/my-shoutouts")}
          className="
            bg-gradient-to-br from-indigo-50 to-purple-50
            rounded-2xl p-5 border border-indigo-100
            shadow-sm hover:shadow-md transition-all
            hover:-translate-y-1 cursor-pointer
          "
        >
          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                <MessageSquare size={20} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  My Shout-Outs
                </p>
                <p className="text-sm text-slate-500">
                  5 given · 3 received
                </p>
              </div>
            </div>

            <ArrowRight size={18} className="text-slate-400" />

          </div>
        </div>

        {/* LEADERBOARD */}
        <div
          onClick={() => navigate("/leaderboard")}
          className="
            bg-gradient-to-br from-amber-50 to-yellow-50
            rounded-2xl p-5 border border-yellow-100
            shadow-sm hover:shadow-md transition-all
            hover:-translate-y-1 cursor-pointer
          "
        >
          <div className="flex justify-between items-center">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center text-yellow-600">
                <Trophy size={20} />
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Leaderboard
                </p>
                <p className="text-sm text-slate-500">
                  You're rank #12
                </p>
              </div>
            </div>

            <ArrowRight size={18} className="text-slate-400" />

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

export default RightPanel;