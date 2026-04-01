import { Trophy, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Card from "../../../../components/ui/Card";
import { getLeaderboard } from "../../../../services/shoutoutService";
import { useUserStats } from "../../hooks/useUserStats";

/*
Reusable Rank Row
*/
const RankItem = ({ user, index }) => {
  const rankColors = [
    "text-yellow-500", // 1st
    "text-slate-500",  // 2nd
    "text-orange-500", // 3rd
  ];

  // Use position if available, otherwise use index
  const rank = user.position || (index + 1);

  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Rank */}
        <span className={`text-sm font-semibold w-6 ${rankColors[index] || "text-slate-400"}`}>
          #{rank}
        </span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
          {user.name.charAt(0)}
        </div>

        {/* Name */}
        <span className="text-sm font-medium text-slate-800">
          {user.name}
        </span>

      </div>

      {/* POINTS */}
      <span className="text-sm font-semibold text-indigo-600">
        {user.points || user.total_points || 0}
      </span>

    </div>
  );
};

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { stats } = useUserStats();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard(3, 0);
        setTopUsers(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setTopUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Get user's actual rank from stats
  const userRank = stats?.rank || 0;

  return (
    <Card className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
            <Trophy size={18} className="text-orange-600" />
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              Leaderboard
            </p>
            <p className="text-xs text-slate-500">
              See top performers
            </p>
          </div>

        </div>

        {/* ACTION */}
        <button className="text-slate-400 hover:text-indigo-600 transition">
          <ArrowRight size={18} />
        </button>

      </div>

      {/* CURRENT USER */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-5">
        <p className="text-sm text-slate-500">
          You're rank{" "}
          <span className="font-semibold text-slate-900">
            #{userRank > 0 ? userRank : "-"}
          </span>
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-sm text-slate-400 text-center py-4">
            Loading...
          </div>
        ) : topUsers.length > 0 ? (
          topUsers.map((user, index) => (
            <RankItem key={user.user_id} user={user} index={index} />
          ))
        ) : (
          <div className="text-sm text-slate-400 text-center py-4">
            No data available
          </div>
        )}
      </div>

    </Card>
  );
};

export default Leaderboard;