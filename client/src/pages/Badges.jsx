import BadgeCard from '../features/employee dashboard/components/BadgeCard';
import { useAnalytics } from '../context/AnalyticsContext';

export default function Badges() {
  const { badges, loading, error } = useAnalytics();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-6 py-8 w-full">
        <div className="mb-7">
          <h1 className="text-4xl font-bold text-gray-900">Badges</h1>
          <p className="text-gray-500 mt-1.5">Recognition badges celebrating excellence</p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading badges: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-4 gap-5">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        )}

        {!loading && !error && badges.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No badges available yet.
          </div>
        )}
      </main>
    </div>
  );
}

