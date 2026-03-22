import ShoutoutHeader from "../components/ShoutoutHeader";
import StatsSection from "../components/StatsSection";
import FilterBar from "../components/FilterBar";
import ShoutoutTable from "../components/ShoutoutTable";

const ShoutoutManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 to-white px-6 py-8 w-full">
      <ShoutoutTable />
    </div>
  );
};

export default ShoutoutManagementPage;