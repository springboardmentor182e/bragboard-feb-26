import Navbar from '../layout/Navbar';
import AnalyticsMetricCard from '../features/employee dashboard/components/AnalyticsMetricCard';
import TopContributorsChart from '../features/employee dashboard/components/TopContributorsChart';
import DepartmentEngagementChart from '../features/employee dashboard/components/DepartmentEngagementChart';
import { analyticsMetrics } from '../data/mockData';

export default function Analytics() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #EDE9FE 0%, #EEF0F8 320px, #EEF0F8 100%)' }}>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="mb-7">
          <h1 className="text-4xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1.5">Insights and performance metrics</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-5 mb-6">
          {analyticsMetrics.map((m) => (
            <AnalyticsMetricCard key={m.label} {...m} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-5">
          <TopContributorsChart />
          <DepartmentEngagementChart />
        </div>
      </main>
    </div>
  );
}
