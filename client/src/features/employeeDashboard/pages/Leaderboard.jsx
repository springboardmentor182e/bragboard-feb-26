import { useState, useEffect } from "react";
import { Trophy, Medal, Zap, Award, Crown } from "lucide-react";
import { getLeaderboard } from "../../../services/shoutoutService";
import { useAuth } from "../../../context/AuthContext";

const Leaderboard = () => {
  const { user: currentUser } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("points"); // points, recognitions
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLeaderboard(500, 0); // Fetch all employees
        
        // Add visual rank and find current user
        const rankedData = data.map((user, idx) => ({
          ...user,
          rank: idx + 1,
          initials: (user.name || "?")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase(),
        }));
        
        setLeaderboard(rankedData);
        
        // Find current user's rank
        const userRank = rankedData.find((u) => u.user_id === currentUser?.id);
        if (userRank) {
          setCurrentUserRank(userRank);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(err.message || "Failed to fetch leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentUser?.id]);

  // Get top 3 users (for podium)
  const topThree = leaderboard.slice(0, 3);

  // Get all users (for full list)
  const allUsers = leaderboard;

  // Get medal color based on rank
  const getMedalColor = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-500";
      case 2:
        return "from-slate-300 to-slate-400";
      case 3:
        return "from-orange-400 to-orange-500";
      default:
        return "from-indigo-400 to-purple-500";
    }
  };

  // Get rank badge icon
  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy size={20} />;
    if (rank === 2) return <Medal size={20} />;
    if (rank === 3) return <Award size={20} />;
    return <span className="text-lg font-bold">#{rank}</span>;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-slate-500">Loading rankings...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-56 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">🏆 Leaderboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          All team members • {leaderboard.length} competitors
        </p>
      </div>

      {/* PODIUM - TOP 3 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">🏆 Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Second Place */}
          {topThree[1] && (
            <div className="relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <div className={`bg-gradient-to-r ${getMedalColor(2)} w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg text-xs`}>
                  {getRankIcon(2)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border-2 border-slate-300 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-slate-400 to-slate-500 text-white flex items-center justify-center text-lg font-bold shadow-md mt-3">
                  {topThree[1].initials}
                </div>
                <h3 className="mt-3 font-semibold text-sm text-slate-900">
                  {topThree[1].name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{topThree[1].department}</p>
                <p className="text-2xl font-bold text-slate-400 mt-3">
                  {topThree[1].points.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">points</p>
              </div>
            </div>
          )}

          {/* First Place */}
          {topThree[0] && (
            <div className="relative md:scale-110 md:z-20">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <div className={`bg-gradient-to-r ${getMedalColor(1)} w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xl text-sm`}>
                  {getRankIcon(1)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-400 text-center shadow-lg">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white flex items-center justify-center text-xl font-bold shadow-md mt-4">
                  {topThree[0].initials}
                </div>
                <h3 className="mt-3 font-bold text-sm text-slate-900">
                  {topThree[0].name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{topThree[0].department}</p>
                <p className="text-3xl font-bold text-yellow-500 mt-3">
                  {topThree[0].points.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">points</p>
              </div>
            </div>
          )}

          {/* Third Place */}
          {topThree[2] && (
            <div className="relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <div className={`bg-gradient-to-r ${getMedalColor(3)} w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg text-xs`}>
                  {getRankIcon(3)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border-2 border-orange-300 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white flex items-center justify-center text-lg font-bold shadow-md mt-3">
                  {topThree[2].initials}
                </div>
                <h3 className="mt-3 font-semibold text-sm text-slate-900">
                  {topThree[2].name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{topThree[2].department}</p>
                <p className="text-2xl font-bold text-orange-400 mt-3">
                  {topThree[2].points.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">points</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ALL EMPLOYEES LIST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">📊 All Employees ({allUsers.length})</h2>
          <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
            Scroll to see all
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* SCROLLABLE LIST */}
          <div className="max-h-[700px] overflow-y-auto">
            {allUsers.map((user) => {
              const isCurrentUser = user.user_id === currentUser?.id;
              const isTopThree = user.rank <= 3;

              return (
                <div
                  key={user.user_id}
                  className={`
                    flex items-center justify-between px-4 py-3 border-b last:border-b-0 transition-all text-sm
                    ${
                      isCurrentUser
                        ? "bg-indigo-50 border-indigo-200"
                        : isTopThree
                        ? "bg-yellow-50/50"
                        : "hover:bg-slate-50 border-slate-200"
                    }
                  `}
                >
                  {/* LEFT - RANK & USER INFO */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* RANK BADGE */}
                    {user.rank <= 3 ? (
                      <div
                        className={`
                          w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0
                          bg-gradient-to-r ${getMedalColor(user.rank)} shadow-md
                        `}
                      >
                        {getRankIcon(user.rank)}
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs flex-shrink-0">
                        {user.rank}
                      </div>
                    )}

                    {/* USER INFO */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900 truncate">
                          {user.name}
                        </p>
                        {isCurrentUser && (
                          <span className="text-xs bg-indigo-200 text-indigo-700 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{user.department}</p>
                    </div>
                  </div>

                  {/* RIGHT - STATS ONLY */}
                  <div className="flex items-center gap-4 text-right flex-shrink-0 ml-2">
                    <div className="hidden sm:flex flex-col">
                      <p className="font-semibold text-indigo-600 text-xs">
                        {user.points.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">pts</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* EMPTY STATE */}
          {allUsers.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-slate-500 text-sm">No team members yet</p>
            </div>
          )}
        </div>
      </div>

      {/* STATS SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={16} className="text-yellow-600" />
            <span className="text-xs font-semibold text-yellow-600 uppercase">Top Score</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {leaderboard[0]?.points?.toLocaleString() || 0}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <Crown size={16} className="text-purple-600" />
            <span className="text-xs font-semibold text-purple-600 uppercase">Members</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {leaderboard.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-600 uppercase">Avg</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {leaderboard.length > 0
              ? Math.round(
                  leaderboard.reduce((sum, u) => sum + u.points, 0) /
                    leaderboard.length
                ).toLocaleString()
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;