import WelcomeSection from "../components/sections/WelcomeSection";
import StatsCards from "../components/sections/StatsCards";
import CampaignBanner from "../components/sections/CampaignBanner";
import LevelProgress from "../components/sections/LevelProgress";
import RightPanel from "../components/layout/RightPanel";
import RecentRecognition from "../components/sections/RecentRecognition";

function EmployeeDashboard() {
  return (
    <div className="space-y-10">

      <WelcomeSection />

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-8">
          <CampaignBanner />
          <LevelProgress />
        </div>

        {/* RIGHT */}
        <RightPanel />

      </div>

      <RecentRecognition />

    </div>
  );
}

export default EmployeeDashboard;