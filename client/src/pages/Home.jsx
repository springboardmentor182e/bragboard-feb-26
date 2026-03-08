import Navbar from '../layout/Navbar';
import WelcomeBanner from '../features/employee dashboard/components/WelcomeBanner';
import CampaignCard from '../features/employee dashboard/components/CampaignCard';
import ShoutoutFeed from '../features/employee dashboard/components/ShoutoutFeed';
import RightSidebar from '../features/employee dashboard/components/RightSidebar';

export default function Home() {
  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="grid grid-cols-[1fr_380px] gap-6 items-start">
          {/* Main Content */}
          <div className="flex flex-col gap-5 min-w-0">
            <WelcomeBanner />
            <CampaignCard />
            <ShoutoutFeed />
          </div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-5 sticky top-20">
            <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
