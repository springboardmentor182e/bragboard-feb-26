import ShoutoutHeader from "../components/ShoutoutHeader";
import StatsSection from "../components/StatsSection";
import FilterBar from "../components/FilterBar";
import ShoutoutTable from "../components/ShoutoutTable";

const ShoutoutManagementPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 space-y-8">
      <ShoutoutHeader />
      <StatsSection />
      <FilterBar />
      <ShoutoutTable />
    </div>
  );
};

export default ShoutoutManagementPage;