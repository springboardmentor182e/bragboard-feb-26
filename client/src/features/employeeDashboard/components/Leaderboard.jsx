import useLeaderboard from "../hooks/useLeaderboard";

const MEDALS = ["🥇", "🥈", "🥉"];

const Leaderboard = ({ selectedEmployee, refreshKey }) => {
  const { leaders, loading } = useLeaderboard(refreshKey);

  return (
    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        🏆 Leaderboard
      </h2>

      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 rounded-lg bg-gray-100 dark:bg-slate-700 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && leaders.length === 0 && (
        <p className="text-sm text-center text-gray-400 dark:text-slate-500 py-6">
          No leaderboard data yet.
        </p>
      )}

      {!loading && leaders.length > 0 && (
        <div className="space-y-3">
          {leaders.map((item, index) => {
            const isCurrentEmployee = item.employee_id === selectedEmployee?.id;
            const medal = MEDALS[index] ?? null;
            return (
              <div
                key={item.employee_id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  isCurrentEmployee
                    ? "bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700"
                    : "bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg w-7 text-center">
                    {medal ?? `${index + 1}`}
                  </span>
                  <div>
                    <p className={`font-medium text-sm ${
                      isCurrentEmployee ? "text-indigo-600 dark:text-indigo-400" : "text-gray-800 dark:text-gray-100"
                    }`}>
                      {item.name}
                      {isCurrentEmployee && <span className="ml-2 text-xs text-indigo-400">(you)</span>}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{item.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-indigo-500 dark:text-indigo-400 font-semibold text-sm">
                    {item.total_score} pts
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    👏 {item.shoutout_count} · ⭐ {item.achievement_points}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
