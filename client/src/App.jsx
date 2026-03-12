import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [top, setTop] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/leaderboard/full")
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch("http://127.0.0.1:8000/leaderboard/top")
      .then(res => res.json())
      .then(data => setTop(data));

    fetch("http://127.0.0.1:8000/leaderboard/stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const deptColor = (dept) => {
    if (dept === "Engineering") return "bg-blue-100 text-blue-600";
    if (dept === "Marketing") return "bg-yellow-100 text-yellow-700";
    if (dept === "HR") return "bg-pink-100 text-pink-600";
    if (dept === "Design") return "bg-purple-100 text-purple-600";
    if (dept === "Sales") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  // Top performers card colors
  const medalBg = [
    "bg-yellow-100 border border-yellow-400", // gold
    "bg-gray-200", // silver
    "bg-orange-100" // bronze
  ];

  const medalEmoji = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-slate-200 p-10">
      {/* Header */}
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <p className="text-gray-600 mb-8">
        Top performers based on recognition and engagement
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-yellow-50 border border-yellow-400 p-6 rounded-xl">
          <p className="text-gray-500">Top Score</p>
          <h2 className="text-3xl font-bold">{top.length ? top[0].points : 0}</h2>
          <p className="text-gray-500 text-sm">{top.length ? top[0].name : ""}</p>
        </div>
        <div className="bg-blue-50 border border-blue-400 p-6 rounded-xl">
          <p className="text-gray-500">Total Badges</p>
          <h2 className="text-3xl font-bold">{stats.total_badges}</h2>
          <p className="text-gray-500 text-sm">Awarded this month</p>
        </div>
        <div className="bg-green-50 border border-green-400 p-6 rounded-xl">
          <p className="text-gray-500">Growth</p>
          <h2 className="text-3xl font-bold">+{stats.growth_percent}%</h2>
          <p className="text-gray-500 text-sm">vs last month</p>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white p-8 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-6">Top Performers</h2>
        <div className="grid grid-cols-3 gap-6">
          {top.map((u, i) => (
            <div key={u.rank} className={`rounded-xl p-8 text-center ${medalBg[i]}`}>
              <div className="text-2xl mb-2">{medalEmoji[i]}</div>
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${u.name}`}
                className="w-16 h-16 mx-auto mb-3"
              />
              <h3 className="font-semibold">{u.name}</h3>
              <p className="text-purple-600 text-xl font-bold">{u.points}</p>
              <span className={`text-xs px-3 py-1 rounded-full ${deptColor(u.department)}`}>
                {u.department}
              </span>
              <p className="text-gray-500 text-sm mt-1">{u.badges} badges</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Rankings */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Full Rankings</h2>

        {/* Header */}
        <div className="grid grid-cols-6 text-gray-500 text-sm font-semibold pb-3 border-b">
          <div>Rank</div>
          <div>Employee</div>
          <div>Department</div>
          <div>Points</div>
          <div>Badges</div>
          <div>Trend</div>
        </div>

        {users.slice(3).map((u) => (
          <div key={u.rank} className="grid grid-cols-6 items-center py-4 border-b text-sm">
            {/* Rank */}
            <div>
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                #{u.rank}
              </span>
            </div>

            {/* Employee (Avatar + Name) */}
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${u.name}`}
                className="w-8 h-8 rounded-full"
              />
              <span>{u.name}</span>
            </div>

            {/* Department */}
            <div>
              <span className={`text-xs px-3 py-1 rounded-full ${deptColor(u.department)}`}>
                {u.department}
              </span>
            </div>

            {/* Points */}
            <div className="font-semibold">{u.points}</div>

            {/* Badges */}
            <div>{u.badges} 🏆</div>

            {/* Trend */}
            <div className={`font-semibold ${u.trend > 0 ? "text-green-600" : "text-red-500"}`}>
              {u.trend > 0 ? "↗ Up" : "↘ Down"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;