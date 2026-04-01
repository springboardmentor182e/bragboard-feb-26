import { useState, useEffect } from "react";
import { Trophy, Medal, Star } from "lucide-react";
import { getLeaderboard } from "../../../services/shoutoutService";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    topScore: 0,
    totalBadges: 0,
    trend: "+0%",
  });

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLeaderboard(100, 0);
        setLeaderboard(data);

        // Calculate stats
        if (data.length > 0) {
          const topScore = data[0].points || 0;
          // Count total badges
          const totalBadges = data.reduce((sum, user) => sum + (user.badges?.length || 0), 0);
          setStats({
            topScore,
            totalBadges,
            trend: "+0%", // Placeholder for future month-over-month
          });
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(err.message || "Failed to fetch leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Get top 3 users (for top section)
  const topUsers = leaderboard.slice(0, 3).map((user, idx) => ({
    ...user,
    position: idx + 1,
  }));

  // Get remaining users for table
  const tableUsers = leaderboard.slice(3);

  if (loading) {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-slate-500">Loading...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
        <p className="text-slate-500">
          Top performers • Updated daily
        </p>
      </div>

      {/* TOP 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topUsers.map((user) => (
          <div
            key={user.user_id}
            className={`
              relative bg-white rounded-2xl p-6 text-center
              border shadow-sm
              ${
                user.position === 1
                  ? "border-yellow-400 shadow-lg scale-105"
                  : "border-slate-200"
              }
            `}
          >
            {/* ICON */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-white shadow
                  ${
                    user.position === 1
                      ? "bg-yellow-500"
                      : user.position === 2
                      ? "bg-slate-400"
                      : "bg-orange-500"
                  }
                `}
              >
                {user.position === 1 ? <Trophy size={18} /> : <Medal size={18} />}
              </div>
            </div>

            {/* AVATAR */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white flex items-center justify-center text-lg font-bold mt-4">
              {user.initials}
            </div>

            {/* NAME */}
            <h3 className="mt-4 font-semibold text-slate-900">
              {user.name}
            </h3>

            {/* DEPT */}
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 inline-block mt-2">
              {user.department}
            </span>

            {/* POINTS */}
            <p className="text-3xl font-bold text-indigo-600 mt-4">
              {user.points.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500">points</p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-5 px-6 py-4 text-sm text-slate-500 border-b">
          <span>Rank</span>
          <span>Employee</span>
          <span>Department</span>
          <span>Points</span>
          <span>Badges</span>
        </div>

        {/* ROWS */}
        {tableUsers.length > 0 ? (
          tableUsers.map((user) => (
            <div
              key={user.user_id}
              className="grid grid-cols-5 px-6 py-4 items-center border-b last:border-none hover:bg-slate-50 transition"
            >
              {/* RANK */}
              <span className="font-medium text-slate-700">
                #{user.position}
              </span>

              {/* USER */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
                  {user.initials}
                </div>
                <span className="font-medium text-slate-900">
                  {user.name}
                </span>
              </div>

              {/* DEPT */}
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 w-fit">
                {user.department}
              </span>

              {/* POINTS */}
              <span className="font-semibold text-indigo-600">
                {user.points.toLocaleString()}
              </span>

              {/* BADGES */}
              <div className="flex gap-3 text-sm">
                {user.badges.includes('heart') && <span>❤️ {user.shoutouts_received}</span>}
                {user.badges.includes('star') && <span>⭐ {user.level}</span>}
                {user.badges.includes('fire') && <span>🔥 {user.shoutouts_received}</span>}
                {user.badges.length === 0 && <span className="text-slate-400">—</span>}
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-slate-500">
            No additional users in leaderboard
          </div>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <p className="text-2xl font-bold text-slate-900">
            {stats.topScore.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500">Top Score</p>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-2xl font-bold text-slate-900">
            {stats.totalBadges}
          </p>
          <p className="text-sm text-slate-500">Total Badges</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
          <p className="text-2xl font-bold text-slate-900">
            {stats.trend}
          </p>
          <p className="text-sm text-slate-500">
            From Last Month
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;