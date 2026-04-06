import { Plus, MessageSquare, Trophy, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateShoutoutModal from "../modals/CreateShoutoutModal";
import CampaignCard from "../cards/campaignCard";
import { useUserStats } from "../../hooks/useUserStats";
import "./RightPanel.css";

const RightPanel = () => {
  const navigate = useNavigate();
  const { stats, refetch } = useUserStats();
  const [openModal, setOpenModal] = useState(false);

  const handleShoutoutSuccess = (createdShoutout) => {
    // Refetch stats to update the counters
    if (refetch) {
      refetch();
    }
  };

  return (
    <>
      <div className="space-y-4">

        {/* CREATE SHOUTOUT */}
        <div
          onClick={() => setOpenModal(true)}
          className="
            create-shoutout-btn rounded-xl p-4
            border border-white/20
            cursor-pointer
          "
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white shadow">
              <Plus size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Create Shout-Out
              </p>
              <p className="text-xs text-white/80">
                Recognize a teammate
              </p>
            </div>
          </div>
        </div>

        {/* 🔥 CAMPAIGN (NOW MOVED BELOW CREATE SHOUTOUT) */}
        <CampaignCard />

        {/* MY SHOUTOUTS */}
        <div
          onClick={() => navigate("/my-shoutouts")}
          className="
            bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4
            border border-indigo-100 dark:border-indigo-900/40
            shadow-sm hover:shadow-md
            transition-all duration-200
            hover:-translate-y-0.5 cursor-pointer
          "
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <MessageSquare size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  My Shout-Outs
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stats?.shoutouts_sent || 0} given · {stats?.shoutouts_received || 0} received
                </p>
              </div>
            </div>

            <ArrowRight size={16} className="text-slate-400 dark:text-slate-500" />
          </div>
        </div>

        {/* LEADERBOARD */}
        <div
          onClick={() => navigate("/leaderboard")}
          className="
            bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4
            border border-yellow-100 dark:border-amber-900/40
            shadow-sm hover:shadow-md
            transition-all duration-200
            hover:-translate-y-0.5 cursor-pointer
          "
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-amber-900/40 flex items-center justify-center text-yellow-600 dark:text-amber-400">
                <Trophy size={18} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Leaderboard
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You're rank #{stats?.rank || "N/A"}
                </p>
              </div>
            </div>

            <ArrowRight size={16} className="text-slate-400 dark:text-slate-500" />
          </div>
        </div>

      </div>

      {/* MODAL */}
      <CreateShoutoutModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleShoutoutSuccess}
      />
    </>
  );
};

export default RightPanel;