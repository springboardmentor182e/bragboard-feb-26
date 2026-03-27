import WelcomeSection from "../components/sections/WelcomeSection";
import StatsCards from "../components/sections/StatsCards";
import LevelProgress from "../components/sections/LevelProgress";
import RightPanel from "../components/layout/RightPanel";
import Feed from "../components/sections/Feed";

function EmployeeDashboard() {
  return (
    <div className="space-y-6">

      {/* 🔥 HERO */}
      <WelcomeSection />

      {/* 📊 STATS (NO WRAPPER NOW) */}
      <StatsCards />

      {/* 🧩 MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT CONTENT */}
        <div className="xl:col-span-2 space-y-6">

          {/* FEED */}
          <Feed />

          {/* LEVEL PROGRESS */}
          <LevelProgress />

        </div>

        {/* RIGHT PANEL */}
        <div className="xl:sticky xl:top-6 h-fit space-y-6">
          <RightPanel />
        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;