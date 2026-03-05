import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import TopContributorsChart from '../components/TopContributorsChart';
import DepartmentPiechart from '../components/DepartmentPiechart';
import ReportedPosts from '../components/ReportedPosts';
import { adminAPI } from '../../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_shoutouts: 0,
    total_reactions: 0,
    active_users: 0,
    reports: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch dashboard stats from backend
      const response = await adminAPI.getDashboardStats();
      
      // Map backend response to your UI needs
      setStats({
        total_shoutouts: response.data.total_posts || 1247,
        total_reactions: response.data.total_reactions || 8592,
        active_users: response.data.active_users_today || 342,
        reports: response.data.total_reports || 4
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Platform oversight and moderation controls</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard title="Total Shout-Outs" value={stats.total_shoutouts.toLocaleString()} trend="+18%" />
        <StatCard title="Total Reactions" value={stats.total_reactions.toLocaleString()} trend="+12%" />
        <StatCard title="Active Users" value={stats.active_users} />
        <StatCard title="Reports" value={stats.reports} />
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