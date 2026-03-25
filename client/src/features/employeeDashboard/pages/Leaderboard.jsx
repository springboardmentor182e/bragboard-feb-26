import { Trophy, Medal } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchLeaderboard } from "../../../services/userService";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const res = await fetchLeaderboard();
      setUsers(res);
    } catch (err) {
      console.error("Leaderboard fetch failed", err);
    }
  };

  // 🔥 TOP 3 USERS
  const topUsers = users.slice(0, 3).map((user, index) => ({
    ...user,
    position: index + 1,
    initials: user.name
      ?.split(" ")
      .map((n) => n[0])
      .join(""),
  }));

  // 🔥 REST USERS
  const leaderboard = users.slice(3).map((user, index) => ({
    ...user,
    rank: index + 4,
    initials: user.name
      ?.split(" ")
      .map((n) => n[0])
      .join(""),
    badges: {
      heart: user.reactions_count || 0,
      star: user.shoutouts_count || 0,
      fire: Math.floor((user.points || 0) / 50),
    },
  }));

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Leaderboard
        </h1>
        <p className="text-slate-500">
          Top performers this month • Updated live
        </p>
      </div>

      {/* TOP 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {topUsers.map((user, i) => (
          <div
            key={i}
            className={`
              relative bg-white rounded-2xl p-6 text-center
              border shadow-sm transition-all
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
                {user.position === 1 ? (
                  <Trophy size={18} />
                ) : (
                  <Medal size={18} />
                )}
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
              {(user.points || 0).toLocaleString()}
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
        {leaderboard.map((user, i) => (
          <div
            key={i}
            className="grid grid-cols-5 px-6 py-4 items-center border-b last:border-none hover:bg-slate-50 transition"
          >

            {/* RANK */}
            <span className="font-medium text-slate-700">
              #{user.rank}
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
              {(user.points || 0).toLocaleString()}
            </span>

            {/* BADGES */}
            <div className="flex gap-3 text-sm">
              <span>❤️ {user.badges.heart}</span>
              <span>⭐ {user.badges.star}</span>
              <span>💪 {user.badges.fire}</span>
            </div>

          </div>
        ))}

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <p className="text-2xl font-bold text-slate-900">
            {users[0]?.points?.toLocaleString() || 0}
          </p>
          <p className="text-sm text-slate-500">Top Score</p>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-2xl font-bold text-slate-900">
            {users.reduce((acc, u) => acc + (u.shoutouts_count || 0), 0)}
          </p>
          <p className="text-sm text-slate-500">Total Shoutouts</p>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
          <p className="text-2xl font-bold text-slate-900">
            {users.length}
          </p>
          <p className="text-sm text-slate-500">
            Active Employees
          </p>
        </div>

      </div>

    </div>
  );
};

export default Leaderboard;