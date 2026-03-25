import { Star } from "lucide-react";

const LevelProgress = () => {
  const progress = 65;

  return (
    <div
      className="
        bg-white rounded-2xl p-6
        border border-slate-200
        shadow-sm hover:shadow-md
        transition-all duration-300
      "
    >

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-slate-500">
            Level Progress
          </p>
          <p className="text-sm text-slate-500">
            350 points to next level
          </p>
        </div>

        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-medium">
          <Star size={14} />
          Level 7
        </div>
      </div>

      {/* PROGRESS LABEL */}
      <div className="flex justify-between text-sm text-slate-600 mb-2">
        <span>Team Champion</span>
        <span>{progress}%</span>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">

        <div
          className="
            h-full rounded-full
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            transition-all duration-500
          "
          style={{ width: `${progress}%` }}
        />

      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>650 points</span>
        <span>1000 points</span>
      </div>

      {/* NEXT LEVEL CARD */}
      <div
        className="
          mt-5
          bg-gradient-to-r from-indigo-50 to-purple-50
          border border-indigo-100
          rounded-xl p-4
          flex items-center gap-3
        "
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow">
          <Star size={18} />
        </div>

        <div>
          <p className="font-semibold text-slate-900 text-sm">
            Next Level: Recognition Leader
          </p>
          <p className="text-xs text-slate-500">
            Unlock exclusive badges and rewards
          </p>
        </div>
      </div>

    </div>
  );
};

export default LevelProgress;