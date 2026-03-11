import { useAnalytics } from '../../../context/AnalyticsContext';

const VARIANT_STYLES = {
  yellow: 'bg-yellow-50 border border-yellow-200',
  gray:   'bg-white border border-gray-200',
  green:  'bg-emerald-50 border border-emerald-200',
};

function StatCard({ label, value, sub, variant }) {
  return (
    <div className={`rounded-2xl p-7 ${VARIANT_STYLES[variant]}`}>
      <p className="text-sm text-gray-500 mb-3">{label}</p>
      <p className="text-5xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-sm text-gray-500">{sub}</p>
    </div>
  );
}

export default function LeaderboardStats() {
  // Get raw data from API
  const { leaderboard } = useAnalytics();
  
  // Calculate stats from data
  const stats = [
    {
      label: "Top Score",
      value: leaderboard && leaderboard.length > 0 ? leaderboard[0]?.points || "—" : "—",
      sub: leaderboard && leaderboard.length > 0 ? leaderboard[0]?.name || "—" : "—",
      variant: "yellow"
    },
    {
      label: "Total Badges",
      value: leaderboard ? leaderboard.reduce((sum, r) => sum + (r.badges || 0), 0) : "—",
      sub: "Awarded this month",
      variant: "gray"
    },
    {
      label: "Growth",
      value: "+24%",
      sub: "vs last month",
      variant: "green"
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-5">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
