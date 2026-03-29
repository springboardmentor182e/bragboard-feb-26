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
    <div className="space-y-10 pb-12">
      {/* Premium Header Section */}
      <div className="pt-4 pb-8 border-b border-gray-200">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">Platform</p>
            <h1 className="text-5xl font-black text-gray-950 tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="hidden md:block px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700">LIVE</p>
          </div>
        </div>
        <p className="text-base text-gray-600 leading-relaxed max-w-2xl mt-3">
          Comprehensive platform oversight with real-time analytics and moderation controls
        </p>
      </div>

      {/* Key Metrics Section */}
      <div>
        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Shout-Outs" value={stats.total_shoutouts} icon="chart" />
          <StatCard title="Reactions" value={stats.total_reactions} icon="heart" />
          <StatCard title="Users" value={stats.active_users} icon="users" />
          <StatCard title="Reports" value={stats.reports} icon="alerts" />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="pt-4">
        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6">Engagement Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopContributorsChart />
          <DepartmentPiechart />
        </div>
      </div>

      {/* Moderation Section */}
      <div className="pt-4">
        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6">Moderation Queue</h2>
        <ReportedPosts />
      </div>
    </div>
  );
};

export default AdminDashboard;