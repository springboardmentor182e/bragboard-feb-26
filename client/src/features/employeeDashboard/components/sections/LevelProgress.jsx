import { Star, TrendingUp } from "lucide-react";

const LevelProgress = () => {
  const progress = 65;

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
            350 points to next level
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg text-sm font-medium backdrop-blur">
          <Star size={14} />
          Level 7
        </div>

      </div>

      {/* TITLE */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">
          Team Champion
        </p>
        <p className="text-sm text-white/70">
          {progress}%
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
          style={{ width: `${progress}%` }}
        />

      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-white/60 mt-2">
        <span>650 pts</span>
        <span>1000 pts</span>
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
              Next Level: Recognition Leader
            </p>
            <p className="text-xs text-white/60">
              Unlock badges & rewards
            </p>
          </div>

        </div>

        {/* Optional CTA */}
        <button className="text-xs bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30 transition">
          View
        </button>

      </div>

    </div>
  );
};

export default LevelProgress;