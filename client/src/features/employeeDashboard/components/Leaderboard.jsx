import { Trophy, Award, Heart, Star, Zap, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/shoutouts/leaderboard`);
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError("Could not load leaderboard. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#5B59FF] mb-4" size={40} />
        <p className="text-slate-500 font-medium italic">Fetching the champions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-red-100 shadow-sm">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Trophy className="text-red-300" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
        <p className="text-slate-500 max-w-md text-center">
          {error}
        </p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-100 shadow-sm">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <Trophy className="text-slate-300" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Rankings Yet</h2>
        <p className="text-slate-500 max-w-md text-center">
          Start recognizing your teammates to see them climb the leaderboard!
        </p>
      </div>
    );
  }

  // Map backend data to UI structure
  const topThree = leaderboard.slice(0, 3).map((user, idx) => ({
    ...user,
    image: `https://i.pravatar.cc/150?u=${user.id}`,
    stats: { hearts: Math.floor(Math.random() * 15), stars: Math.floor(Math.random() * 15), muscles: Math.floor(Math.random() * 15) },
    color: idx === 0 ? "border-yellow-400" : idx === 1 ? "border-slate-200" : "border-orange-200",
    bg: idx === 0 ? "bg-yellow-50" : idx === 1 ? "bg-slate-50" : "bg-orange-50",
  }));

  const tableData = leaderboard.slice(3).map(user => ({
    ...user,
    trend: "up", // Mock trend
    badges: { hearts: Math.floor(Math.random() * 15), stars: Math.floor(Math.random() * 15), muscles: Math.floor(Math.random() * 15) },
    image: `https://i.pravatar.cc/150?u=${user.id}`,
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
        <p className="text-slate-500 mt-1 font-medium">
          Top performers this month • <span className="text-slate-400">Updated daily</span>
        </p>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* David Kim (Rank 2) */}
        <div className="order-2 md:order-1">
          {topThree[1] && <TopCard user={topThree[1]} />}
        </div>
        {/* Jessica Park (Rank 1) */}
        <div className="order-1 md:order-2">
          {topThree[0] && <TopCard user={topThree[0]} highlighted />}
        </div>
        {/* Michael Rodriguez (Rank 3) */}
        <div className="order-3 md:order-3">
          {topThree[2] && <TopCard user={topThree[2]} />}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Rank</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase">Employee</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase text-center">Department</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase text-center">Points</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase text-center">Badges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {tableData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{row.rank}</span>
                    {row.trend === "up" && <TrendingUp size={14} className="text-green-500" />}
                    {row.trend === "down" && <TrendingDown size={14} className="text-rose-500" />}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    {row.image ? (
                      <img src={row.image} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        {row.initials}
                      </div>
                    )}
                    <span className="font-semibold text-slate-700">{row.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.role === "Customer Success" ? "bg-green-50 text-green-600" :
                    row.role === "Data & Analytics" ? "bg-blue-50 text-blue-600" :
                    row.role === "Marketing" ? "bg-purple-50 text-purple-600" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {row.role}
                  </span>
                </td>
                <td className="px-6 py-5 text-center font-bold text-[#5B59FF]">
                  {row.points}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-4 text-slate-500">
                    <div className="flex items-center gap-1"><Heart size={14} className="text-orange-400 fill-orange-400" /> <span className="text-xs font-bold">{row.badges.hearts}</span></div>
                    <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /> <span className="text-xs font-bold">{row.badges.stars}</span></div>
                    <div className="flex items-center gap-1"><Zap size={14} className="text-orange-600 fill-orange-600" /> <span className="text-xs font-bold">{row.badges.muscles}</span></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats Bottom (Matching Image) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="bg-[#5B59FF]/5 rounded-[28px] p-6 flex items-center gap-4 border border-[#5B59FF]/10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Trophy className="text-[#5B59FF]" size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">2,845</div>
            <div className="text-xs font-medium text-slate-500">Top Score</div>
          </div>
        </div>
        <div className="bg-green-50/50 rounded-[28px] p-6 flex items-center gap-4 border border-green-100">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Award className="text-green-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">487</div>
            <div className="text-xs font-medium text-slate-500">Total Badges</div>
          </div>
        </div>
        <div className="bg-yellow-50/50 rounded-[28px] p-6 flex items-center gap-4 border border-yellow-100">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <TrendingUp className="text-orange-500" size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">+23%</div>
            <div className="text-xs font-medium text-slate-500">From Last Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopCard = ({ user, highlighted = false }) => {
  return (
    <div className={`relative bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-sm border ${
      highlighted ? "border-yellow-400 ring-4 ring-yellow-400/10 py-12" : "border-slate-100"
    }`}>
      {/* Rank Icon */}
      <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
        user.rank === 1 ? "bg-yellow-400" : user.rank === 2 ? "bg-slate-200" : "bg-orange-100"
      }`}>
        {user.rank === 1 ? <Trophy size={20} className="text-white" /> : <Award size={20} className="text-slate-600" />}
      </div>

      {/* Avatar */}
      <div className="relative mb-4">
        <img src={user.image} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" alt="" />
      </div>

      {/* Name & Role */}
      <div className="space-y-1 mb-4">
        <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          user.role === "Engineering" ? "bg-indigo-50 text-indigo-600" : "bg-orange-50 text-orange-600"
        }`}>
          {user.role}
        </span>
      </div>

      {/* Points */}
      <div className="mb-4">
        <div className="text-3xl font-black text-[#5B59FF] leading-none">{user.points}</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">points</div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-slate-500">
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-bold text-slate-900">{user.stats.hearts}</span>
          <Heart size={16} className="text-orange-400 fill-orange-400" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-bold text-slate-900">{user.stats.stars}</span>
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-bold text-slate-900">{user.stats.muscles}</span>
          <Zap size={16} className="text-orange-600 fill-orange-600" />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;