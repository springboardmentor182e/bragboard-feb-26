import Navbar from '../layout/Navbar';
import LeaderboardStats from '../features/employee dashboard/components/LeaderboardStats';
import TopPerformers from '../features/employee dashboard/components/TopPerformers';
import FullRankings from '../features/employee dashboard/components/FullRankings';

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="mb-7">
          <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-500 mt-1.5 text-base">
            Top performers based on recognition and engagement
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <LeaderboardStats />
          <TopPerformers />
          <FullRankings />
        </div>
      </main>
    </div>
  );
}
