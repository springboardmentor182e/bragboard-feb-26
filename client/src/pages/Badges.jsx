import Navbar from '../layout/Navbar';
import BadgeCard from '../features/employee dashboard/components/BadgeCard';
import { badgesList } from '../data/mockData';

export default function Badges() {
  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="mb-7">
          <h1 className="text-4xl font-bold text-gray-900">Badges</h1>
          <p className="text-gray-500 mt-1.5">Recognition badges celebrating excellence</p>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {badgesList.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </main>
    </div>
  );
}
