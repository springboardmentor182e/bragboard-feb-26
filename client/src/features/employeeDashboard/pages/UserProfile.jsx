import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Award, Star, Crown, Zap, Flame } from "lucide-react";
import { getUserStats, getLevelProgress } from "../../../services/userStatsService";
import { getAllUsers } from "../../../services/shoutoutService";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [levelProgress, setLevelProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data
        const users = await getAllUsers();
        const userData = users.find((u) => u.id === parseInt(userId));

        if (!userData) {
          setError("User not found");
          return;
        }

        // Fetch user stats and level progress
        const userStats = await getUserStats(userId);
        const userProgress = await getLevelProgress(userId);

        setUser(userData);
        setStats(userStats);
        setLevelProgress(userProgress);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Map backend icon strings to Lucide React components
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

  // Calculate member since date
  const getMemberSinceDate = () => {
    if (!user?.created_at) return "Recently";
    const date = new Date(user.created_at);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <button
          onClick={() => navigate("/team")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft size={18} /> Back to Team
        </button>
        <div className="text-center py-12">
          <p className="text-slate-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <button
          onClick={() => navigate("/team")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft size={18} /> Back to Team
        </button>
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!user || !stats) {
    return (
      <div className="space-y-8">
        <button
          onClick={() => navigate("/team")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft size={18} /> Back to Team
        </button>
        <div className="text-center py-12">
          <p className="text-slate-500">User data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/team")}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
      >
        <ArrowLeft size={18} /> Back to Team
      </button>

      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* AVATAR */}
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
            {user.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-white/80 text-lg">{user.role}</p>
            <p className="text-white/70 text-sm mt-1">
              {user.department || "General"} • Member since {getMemberSinceDate()}
            </p>
          </div>

          {/* RANK BADGE */}
          {stats?.rank && (
            <div className="bg-white/20 rounded-xl p-4 text-center min-w-fit">
              <p className="text-white/70 text-sm">Current Rank</p>
              <p className="text-2xl font-bold">#{stats.rank}</p>
            </div>
          )}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-2">Total Points</p>
          <p className="text-3xl font-bold text-indigo-600">{stats?.total_points || 0}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-2">Current Level</p>
          <p className="text-3xl font-bold text-purple-600">{stats?.current_level || 1}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-2">Recognitions Received</p>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.shoutouts_received || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-2">Recognitions Sent</p>
          <p className="text-3xl font-bold text-green-600">
            {stats?.shoutouts_sent || 0}
          </p>
        </div>
      </div>

      {/* LEVEL PROGRESS */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Level Progress</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">
              Level {stats?.current_level || 1}
            </span>
            <span className="text-slate-500 text-sm">
              {stats?.points_to_next_level || 500} points to next level
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${
                  100 - ((stats?.points_to_next_level || 500) / 500) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {stats?.total_points || 0} / {(stats?.current_level || 1) * 500} points
          </p>
        </div>
      </div>

      {/* BADGES SECTION */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {levelProgress?.badges && levelProgress.badges.length > 0 ? (
            levelProgress.badges.map((badge) => {
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
                  className={`relative rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    badge.unlocked
                      ? `bg-gradient-to-br ${colorMap[badge.icon]} text-white shadow-lg hover:shadow-xl`
                      : "bg-slate-100 text-slate-400"
                  }`}
                  title={badge.description}
                >
                  <IconComponent size={32} className="mb-3" />
                  <p className="text-xs font-bold">{badge.name}</p>
                  {!badge.unlocked && (
                    <p className="text-xs mt-2 opacity-75">
                      {badge.points_to_unlock} pts
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-slate-500 col-span-full text-center">Loading badges...</p>
          )}
        </div>
      </div>

      {/* EMAIL SECTION */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Contact</h2>
        <a
          href={`mailto:${user.email}`}
          className="text-indigo-600 hover:text-indigo-700 font-medium break-all"
        >
          {user.email}
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
