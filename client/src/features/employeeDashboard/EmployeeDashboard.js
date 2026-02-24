import "./employeeDashboard.css";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import StatsCard from "./components/StatsCard";
import ActivityCard from "./components/ActivityCard";

const EmployeeDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <TopNavbar />

        <h2>Welcome back, Sana 👋</h2>

        <div className="stats-container">
          <StatsCard title="Total Points" value="120" />
          <StatsCard title="Badges Earned" value="8" />
          <StatsCard title="Recognitions Given" value="15" />
        </div>

        <h3 style={{ marginTop: "40px" }}>Recent Recognitions</h3>
        <ActivityCard />
        <ActivityCard />
      </div>
    </div>
  );
};

export default EmployeeDashboard;