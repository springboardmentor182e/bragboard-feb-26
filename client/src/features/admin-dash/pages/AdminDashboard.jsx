import React from 'react';
import StatCard from '../components/StatCard';
import TopContributorsChart from '../components/TopContributorsChart';
import DepartmentPiechart from '../components/DepartmentPiechart';
import ReportedPosts from '../components/ReportedPosts';

const AdminDashboard = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Platform oversight and moderation controls</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard title="Total Shout-Outs" value="1,247" trend="+18%" />
        <StatCard title="Total Reactions" value="8,592" trend="+12%" />
        <StatCard title="Active Users" value="342" />
        <StatCard title="Reports" value="4" />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <TopContributorsChart />
        <DepartmentPiechart />
      </div>
      
      {/* Reported Posts */}
      <ReportedPosts />
    </>
  );
};

export default AdminDashboard;