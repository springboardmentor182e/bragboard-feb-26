import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import TopContributorsChart from "../components/charts/TopContributorsChart";
import DepartmentPiechart from "../components/charts/DepartmentPiechart";
import ReportedPosts from "../components/ReportedPosts";
import { adminAPI } from "../../../services/api";
import { mockDashboardStats } from "../mockData";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_shoutouts: 0,
    total_reactions: 0,
    active_users: 0,
    reports: 0,
    shoutout_trend: "+0%",
    reaction_trend: "+0%",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await adminAPI.getDashboardStats();
      const data = res.data;

      setStats({
        total_shoutouts: data.total_posts || 0,
        total_reactions: data.total_reactions || 0,
        active_users: data.active_users || 0,
        reports: data.total_reports || 0,
        shoutout_trend: "+0%",
        reaction_trend: "+0%",
      });
    } catch {
      setStats(mockDashboardStats);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Platform oversight and moderation controls</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Shout-Outs" value={stats.total_shoutouts} icon="chart" />
        <StatCard title="Reactions" value={stats.total_reactions} icon="heart" />
        <StatCard title="Users" value={stats.active_users} icon="users" />
        <StatCard title="Reports" value={stats.reports} icon="alerts" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopContributorsChart />
        <DepartmentPiechart />
      </div>

      {/* Reported Posts Section */}
      <ReportedPosts />
    </div>
  );
};

export default AdminDashboard;