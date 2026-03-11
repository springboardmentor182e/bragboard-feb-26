import { TrendingUp, TrendingDown } from 'lucide-react';
import DepartmentPill from './DepartmentPill';
import { useAnalytics } from '../../../context/AnalyticsContext';

function TrendBadge({ trend }) {
  if (trend === 'up') {
    return (
      <span className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm">
        <TrendingUp size={16} strokeWidth={2} />
        Up
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1.5 text-red-500 font-medium text-sm">
      <TrendingDown size={16} strokeWidth={2} />
      Down
    </span>
  );
}

export default function FullRankings() {
  const { leaderboard } = useAnalytics();
  const fullRankings = leaderboard || [];

  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Full Rankings</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-sm font-medium text-gray-500 pb-4 w-24">Rank</th>
            <th className="text-left text-sm font-medium text-gray-500 pb-4">Employee</th>
            <th className="text-left text-sm font-medium text-gray-500 pb-4">Department</th>
            <th className="text-left text-sm font-medium text-gray-500 pb-4">Points</th>
            <th className="text-left text-sm font-medium text-gray-500 pb-4">Badges</th>
            <th className="text-left text-sm font-medium text-gray-500 pb-4">Trend</th>
          </tr>
        </thead>
        <tbody>
          {fullRankings.map((row, i) => (
            <tr
              key={row.rank}
              className={i < fullRankings.length - 1 ? 'border-b border-gray-100' : ''}
            >
              <td className="py-5">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary-light text-primary-dark text-sm font-semibold">
                  #{row.rank}
                </span>
              </td>
              <td className="py-5">
                <div className="flex items-center gap-3">
                  <img
                    src={row.avatar}
                    alt={row.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <span className="font-semibold text-gray-900">{row.name}</span>
                </div>
              </td>
              <td className="py-5">
                <DepartmentPill department={row.department} />
              </td>
              <td className="py-5">
                <span className="font-bold text-gray-900 text-base">{row.points.toLocaleString()}</span>
              </td>
              <td className="py-5">
                <span className="text-gray-700 text-sm">{row.badges} 🏆</span>
              </td>
              <td className="py-5">
                <TrendBadge trend={row.trend} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
