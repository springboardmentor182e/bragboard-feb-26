import { X, Lock, CheckCircle2 } from "lucide-react";

const LevelProgressModal = ({ isOpen, onClose, progress, loading }) => {
  if (!isOpen) return null;

  if (loading || !progress) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4">
          <p className="text-center text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getIconForBadge = (icon) => {
    const iconMap = {
      star: "⭐",
      award: "🏆",
      crown: "👑",
      zap: "⚡",
      flame: "🔥",
    };
    return iconMap[icon] || "✨";
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Your Progress</h2>
            <p className="text-slate-600">Level {progress.current_level}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
            <p className="text-sm text-indigo-600 font-semibold mb-1">
              Total Points
            </p>
            <p className="text-3xl font-bold text-indigo-900">
              {progress.total_points}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-semibold mb-1">
              Level
            </p>
            <p className="text-3xl font-bold text-purple-900">
              {progress.current_level}
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
            <p className="text-sm text-pink-600 font-semibold mb-1">
              Next Level
            </p>
            <p className="text-3xl font-bold text-pink-900">
              {progress.points_to_next_level}
            </p>
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progress.badges && progress.badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-lg p-4 border-2 transition ${
                  badge.unlocked
                    ? "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 shadow-lg"
                    : "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`text-3xl pt-1 ${
                        badge.unlocked ? "" : "grayscale opacity-50"
                      }`}
                    >
                      {getIconForBadge(badge.icon)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm">
                        {badge.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {badge.description}
                      </p>
                      <p className="text-xs font-semibold text-slate-700 mt-2">
                        {badge.points_required} pts
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {badge.unlocked ? (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Lock size={20} className="text-slate-400 mb-1" />
                        <span className="text-xs text-slate-500 font-semibold">
                          {badge.points_to_unlock}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-600 text-center">
            Keep earning recognition to unlock more badges!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelProgressModal;
