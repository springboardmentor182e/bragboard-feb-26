import { X, Award, Star, Crown, Zap, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getUserStats, getLevelProgress } from "../../../services/userStatsService";

const ProfilePopup = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [levelProgress, setLevelProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user?.id) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const userStats = await getUserStats(user.id);
          const userProgress = await getLevelProgress(user.id);
          setStats(userStats);
          setLevelProgress(userProgress);
        } catch (err) {
          console.error("Error fetching profile data:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen, user?.id]);

  const getIconComponent = (iconName) => {
    const iconMap = {
      star: Star,
      award: Award,
      crown: Crown,
      zap: Zap,
      flame: Flame,
    };
    return iconMap[iconName] || Star;
  };

  const getMemberSinceDate = () => {
    if (!user?.created_at) return "Recently";
    const date = new Date(user.created_at);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* DARK BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* POPUP MODAL */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition z-10"
        >
          <X size={20} className="text-slate-500" />
        </button>

        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex flex-col items-center text-center">
            {/* AVATAR */}
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-3">
              {user?.name
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}
            </div>

            {/* NAME & ROLE */}
            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
            <p className="text-white/80 text-sm">{user?.role}</p>
            <p className="text-white/70 text-xs mt-1">
              {user?.department || "General"} • Member since {getMemberSinceDate()}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-slate-500">Loading profile...</p>
            </div>
          ) : (
            <>
              {/* RANK BADGE */}
              {stats?.rank && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 text-center border border-indigo-200">
                  <p className="text-slate-600 text-xs uppercase tracking-wide font-semibold">
                    Your Rank
                  </p>
                  <p className="text-3xl font-bold text-indigo-600 mt-1">
                    #{stats.rank}
                  </p>
                </div>
              )}

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Points</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {stats?.total_points || 0}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Level</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats?.current_level || 1}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Received</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats?.shoutouts_received || 0}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1">Sent</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats?.shoutouts_sent || 0}
                  </p>
                </div>
              </div>

              {/* LEVEL PROGRESS BAR */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-semibold text-slate-600">
                    Level {stats?.current_level || 1} Progress
                  </p>
                  <p className="text-xs text-slate-500">
                    {stats?.points_to_next_level || 500} pts left
                  </p>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        100 - ((stats?.points_to_next_level || 500) / 500) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* BADGES SHOWCASE */}
              {levelProgress?.badges && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Achievements
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {levelProgress.badges.map((badge) => {
                      const IconComponent = getIconComponent(badge.icon);
                      const colorMap = {
                        star: "from-yellow-400 to-yellow-500",
                        award: "from-blue-400 to-blue-500",
                        crown: "from-purple-400 to-purple-500",
                        zap: "from-orange-400 to-orange-500",
                        flame: "from-red-400 to-red-500",
                      };

                      return (
                        <div
                          key={badge.id}
                          className={`rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all ${
                            badge.unlocked
                              ? `bg-gradient-to-br ${colorMap[badge.icon]} text-white shadow-md`
                              : "bg-slate-200 text-slate-400"
                          }`}
                          title={badge.description}
                        >
                          <IconComponent size={20} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div className="text-center border-t pt-4">
                <p className="text-xs text-slate-500 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-900 break-all">
                  {user?.email}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePopup;
