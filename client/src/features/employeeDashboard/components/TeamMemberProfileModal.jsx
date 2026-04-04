import { X, Award, Star, Crown, Zap, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { getUserStats, getLevelProgress } from "../../../services/userStatsService";

const TeamMemberProfileModal = ({ isOpen, onClose, userId, userName }) => {
  const [stats, setStats] = useState(null);
  const [levelProgress, setLevelProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          const userStats = await getUserStats(userId);
          const userProgress = await getLevelProgress(userId);
          setStats(userStats);
          setLevelProgress(userProgress);
          
          // Set user details from props and stats
          setUserDetails({
            name: userName,
            department: userStats?.department || "General",
            role: userStats?.role || "Team Member",
            email: userStats?.email || "N/A",
            created_at: userStats?.created_at,
          });
        } catch (err) {
          console.error("Error fetching profile data:", err);
          setError("Failed to load profile");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isOpen, userId, userName]);

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
    if (!userDetails?.created_at) return "Recently";
    try {
      const date = new Date(userDetails.created_at);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return "Recently";
    }
  };

  const getUserInitials = () => {
    if (!userDetails?.name) return "?";
    return userDetails.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* DARK BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* POPUP MODAL */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition z-10"
        >
          <X size={20} className="text-slate-500" />
        </button>

        {/* HEADER SECTION */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <div className="flex flex-col items-center text-center">
            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold mb-4 shadow-lg">
              {getUserInitials()}
            </div>

            {/* NAME & ROLE */}
            <h2 className="text-3xl font-bold mb-2">{userDetails?.name}</h2>
            <p className="text-white/90 text-base font-medium">{userDetails?.role}</p>
            <p className="text-white/70 text-sm mt-2">
              {userDetails?.department} • Member since {getMemberSinceDate()}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              {/* RANK BADGE */}
              {stats?.rank && (
                <div className="flex justify-center">
                  <div className="px-6 py-3 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-200 rounded-full">
                    <p className="text-sm font-semibold text-amber-900">
                      🏆 Rank #{stats.rank}
                    </p>
                  </div>
                </div>
              )}

              {/* STATS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Total Points */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    Total Points
                  </p>
                  <p className="text-2xl font-bold text-blue-900 mt-2">
                    {stats?.total_points || 0}
                  </p>
                </div>

                {/* Current Level */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                    Level
                  </p>
                  <p className="text-2xl font-bold text-purple-900 mt-2">
                    {stats?.level || 1}
                  </p>
                </div>

                {/* Recognitions Received */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                    Received
                  </p>
                  <p className="text-2xl font-bold text-green-900 mt-2">
                    {stats?.shoutouts_received || 0}
                  </p>
                </div>

                {/* Recognitions Sent */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                    Sent
                  </p>
                  <p className="text-2xl font-bold text-orange-900 mt-2">
                    {stats?.shoutouts_sent || 0}
                  </p>
                </div>

                {/* Reactions Received */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
                  <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide">
                    Reactions
                  </p>
                  <p className="text-2xl font-bold text-pink-900 mt-2">
                    {stats?.reactions_received || 0}
                  </p>
                </div>

                {/* Member Since */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Member Since
                  </p>
                  <p className="text-lg font-bold text-slate-900 mt-2">
                    {getMemberSinceDate()}
                  </p>
                </div>
              </div>

              {/* LEVEL PROGRESS */}
              {levelProgress && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-semibold text-slate-700">
                      Progress to Level {(stats?.level || 1) + 1}
                    </p>
                    <p className="text-xs font-bold text-slate-600">
                      {levelProgress.points_in_level} / {levelProgress.points_needed}
                    </p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (levelProgress.points_in_level / levelProgress.points_needed) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* BADGES SECTION */}
              {levelProgress?.achievements && levelProgress.achievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-4">
                    🏅 Badges & Achievements
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {levelProgress.achievements.map((achievement, idx) => {
                      const IconComponent = getIconComponent(achievement.icon);
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 transition text-center ${
                            achievement.unlocked
                              ? "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300"
                              : "bg-slate-50 border-slate-300 opacity-60"
                          }`}
                        >
                          <div className="flex justify-center mb-2">
                            <IconComponent
                              size={24}
                              className={achievement.unlocked ? "text-amber-600" : "text-slate-400"}
                            />
                          </div>
                          <p className="text-xs font-semibold text-slate-700">
                            {achievement.name}
                          </p>
                          {!achievement.unlocked && (
                            <p className="text-xs text-slate-500 mt-1">
                              {achievement.points_needed} pts
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CONTACT INFO */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Contact
                </p>
                <p className="text-sm text-blue-900 mt-2 break-all">{userDetails?.email}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamMemberProfileModal;
