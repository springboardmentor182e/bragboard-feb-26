import { useState } from "react";
import { Star, TrendingUp } from "lucide-react";
import { useUserStats } from "../../hooks/useUserStats";
import { useLevelProgress } from "../../hooks/useLevelProgress";
import LevelProgressModal from "../modals/LevelProgressModal";

const LevelProgress = () => {
  const { stats } = useUserStats();
  const { progress: levelProgress, loading } = useLevelProgress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate progress percentage
  const totalPointsPerLevel = 500;
  const currentLevelProgress = (stats?.total_points || 0) % totalPointsPerLevel;
  const progressPercentage = Math.min((currentLevelProgress / totalPointsPerLevel) * 100, 100);

  // Get next level title
  const getLevelTitle = (level) => {
    const titles = {
      1: "Rising Star",
      2: "Team Player",
      3: "Recognition Leader",
      4: "Champion",
      5: "Legend",
    };
    return titles[level] || `Champion Level ${level}`;
  };

  const nextLevel = (stats?.current_level || 1) + 1;
  const nextLevelTitle = getLevelTitle(nextLevel);

  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl p-6
        bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900
        text-white
        shadow-[0_20px_60px_rgba(79,70,229,0.35)]
      "
    >

      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5 z-10 relative">

        <div>
          <p className="text-sm text-white/70">
            Level Progress
          </p>
          <p className="text-sm text-white/70">
            {stats?.points_to_next_level || 500} points to next level
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur">
          <Star size={14} />
          Level {stats?.current_level || 1}
        </div>

      </div>

      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">
          {getLevelTitle(stats?.current_level || 1)}
        </p>
        <p className="text-sm text-white/70">
          {Math.min(Math.round(progressPercentage), 100)}%
        </p>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">

        <div
          className="
            h-full rounded-full
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
            transition-all duration-700
          "
          style={{ width: `${progressPercentage}%` }}
        />

      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-white/60 mt-2">
        <span>{currentLevelProgress} pts</span>
        <span>{totalPointsPerLevel} pts</span>
      </div>

      {/* NEXT LEVEL */}
      <div
        className="
          mt-6
          bg-white/10
          border border-white/10
          rounded-xl p-4
          flex items-center justify-between
          backdrop-blur
        "
      >

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 text-white flex items-center justify-center shadow">
            <TrendingUp size={18} />
          </div>

          <div>
            <p className="font-semibold text-sm">
              Next Level: {nextLevelTitle}
            </p>
            <p className="text-xs text-white/60">
              Keep recognizing to advance
            </p>
          </div>

        </div>

        {/* Optional CTA */}
        <button onClick={() => setIsModalOpen(true)} className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition">
          View
        </button>

      </div>

      <LevelProgressModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        progress={levelProgress}
        loading={loading}
      />
    </div>
  );
};

export default LevelProgress;