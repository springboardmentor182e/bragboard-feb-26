import StatsGrid from "../components/StatsGrid";
import TopContributorsChart from "../components/TopContributorsChart";
import DepartmentPieChart from "../components/DepartmentPieChart";
import ReportedPosts from "../components/ReportedPosts";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <StatsGrid />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TopContributorsChart />
        <DepartmentPieChart />
      </div>
      <ReportedPosts />
    </div>
  );
};

export default AdminDashboard;