import { Plus, MessageSquare, Trophy, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateShoutoutModal from "../modals/CreateShoutoutModal";

// ✅ IMPORT YOUR EXISTING CAMPAIGN CARD
import CampaignCard from "../cards/campaignCard";

const RightPanel = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="space-y-4">

        {/* 🔥 CAMPAIGN (REPLACED WITH REUSABLE COMPONENT) */}
        <CampaignCard />

        {/* CREATE SHOUTOUT */}
        <div
          onClick={() => setOpenModal(true)}
          className="
            bg-white rounded-xl p-4
            border border-slate-200
            shadow-sm hover:shadow-md
            transition-all duration-200
            cursor-pointer hover:-translate-y-0.5
          "
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow">
              <Plus size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Create Shout-Out
              </p>
              <p className="text-xs text-slate-500">
                Recognize a teammate
              </p>
            </div>
          </div>
        </div>

        {/* MY SHOUTOUTS */}
        <div
          onClick={() => navigate("/my-shoutouts")}
          className="
            bg-indigo-50 rounded-xl p-4
            border border-indigo-100
            shadow-sm hover:shadow-md
            transition-all duration-200
            hover:-translate-y-0.5 cursor-pointer
          "
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <MessageSquare size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  My Shout-Outs
                </p>
                <p className="text-xs text-slate-500">
                  5 given · 3 received
                </p>
              </div>
            </div>

            <ArrowRight size={16} className="text-slate-400" />
          </div>
        </div>

        {/* LEADERBOARD */}
        <div
          onClick={() => navigate("/leaderboard")}
          className="
            bg-amber-50 rounded-xl p-4
            border border-yellow-100
            shadow-sm hover:shadow-md
            transition-all duration-200
            hover:-translate-y-0.5 cursor-pointer
          "
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
                <Trophy size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Leaderboard
                </p>
                <p className="text-xs text-slate-500">
                  You're rank #12
                </p>
              </div>
            </div>

            <ArrowRight size={16} className="text-slate-400" />
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