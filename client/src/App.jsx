import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";
import TopPerformerCard from "./components/TopPerformerCard";
import RankingTable from "./components/RankingTable";

function App() {
  const [stats, setStats] = useState({
    top_score: 0,
    total_badges: 0,
    growth_percent: 0,
  });

  const [topUsers, setTopUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/leaderboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          top_score: data.top_score || 0,
          total_badges: data.total_badges || 0,
          growth_percent: data.growth_percent || 0,
        });
      })
      .catch(() => {
        console.log("Stats API failed");
      });

    fetch("http://localhost:8000/leaderboard/top")
      .then((res) => res.json())
      .then((data) => setTopUsers(data))
      .catch(() => {
        console.log("Top users API failed");
      });

    fetch("http://localhost:8000/leaderboard/full")
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch(() => {
        console.log("Full leaderboard API failed");
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#E9EEF6] py-14">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Leaderboard
          </h1>
          <p className="text-gray-600 mt-2">
            Top performers based on recognition and engagement
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          <StatCard
            title="Top Score"
            value={stats.top_score}
            subtitle={topUsers[0]?.name || ""}
            variant="yellow"
          />

          <StatCard
            title="Total Badges"
            value={stats.total_badges}
            subtitle="Awarded this month"
            variant="blue"
          />

          <StatCard
            title="Growth"
            value={`+${stats.growth_percent}%`}
            subtitle="vs last month"
            variant="green"
          />

        </div>

        {/* Top Performers */}
        <div className="bg-[#F3F4F6] rounded-3xl p-10 mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Top Performers
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-8">
            {topUsers[1] && (
              <TopPerformerCard user={topUsers[1]} rank={2} />
            )}
            {topUsers[0] && (
              <TopPerformerCard user={topUsers[0]} rank={1} />
            )}
            {topUsers[2] && (
              <TopPerformerCard user={topUsers[2]} rank={3} />
            )}
          </div>
        </div>

        {/* Ranking Table */}
        <RankingTable data={allUsers.slice(3)} />

      </div>
    </div>
  );
}

export default App;