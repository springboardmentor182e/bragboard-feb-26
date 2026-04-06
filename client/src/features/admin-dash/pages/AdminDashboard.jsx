import React, { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import TopContributorsChart from "../components/charts/TopContributorsChart";
import DepartmentPiechart from "../components/charts/DepartmentPiechart";
import SimpleReportedPosts from "../components/SimpleReportedPosts";
import { adminAPI } from "../../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_shoutouts: 0,
    total_reactions: 0,
    active_users: 0,
    reports: 0,
    pending_users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const res = await adminAPI.getDashboardStats();
      const data = res.data;

      setStats({
        total_shoutouts: data.total_posts || 0,
        total_reactions: data.total_reactions || 0,
        active_users: data.active_users || 0,
        reports: data.total_reports || 0,
        pending_users: data.pending_users || 0,
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setStats(mockDashboardStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Real-time refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getLastUpdatedText = () => {
    if (!lastUpdated) return "Loading...";
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  if (loading) {
    return (
      <div className="space-y-10 pb-12">
        <div className="pt-4 pb-8 border-b border-gray-200 dark:border-slate-800">
          <h1 className="text-5xl font-black text-gray-950 dark:text-white tracking-tight transition-colors">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-3 transition-colors">Loading dashboard data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 dark:bg-slate-900 rounded-2xl animate-pulse transition-colors" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12 transition-colors">
      {/* Premium Header Section */}
      <div className="pt-4 pb-8 border-b border-gray-200 dark:border-slate-800 flex items-end justify-between transition-colors">
        <div>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 transition-colors">Platform</p>
          <h1 className="text-5xl font-black text-gray-950 dark:text-white tracking-tight transition-colors">Admin Dashboard</h1>
          <p className="text-base text-gray-600 dark:text-slate-400 leading-relaxed max-w-2xl mt-3 transition-colors">
            Comprehensive platform oversight with real-time analytics and moderation controls
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30 transition-colors">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 transition-colors">🔄 LIVE</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-500 transition-colors">Updated {getLastUpdatedText()}</p>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest transition-colors">Performance Metrics</h2>
          <button
            onClick={fetchDashboardData}
            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition font-medium transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard 
            title="Shout-Outs" 
            value={stats.total_shoutouts} 
            icon="chart" 
            color="blue"
          />
          <StatCard 
            title="Reactions" 
            value={stats.total_reactions} 
            icon="heart" 
            color="amber"
          />
          <StatCard 
            title="Users" 
            value={stats.active_users} 
            icon="users" 
            color="emerald"
          />
          <StatCard 
            title="Reports" 
            value={stats.reports} 
            icon="alerts" 
            color="rose"
          />
          <StatCard 
            title="Pending Approvals" 
            value={stats.pending_users} 
            icon="user-plus" 
            color={stats.pending_users > 0 ? "amber" : "gray"}
            highlight={stats.pending_users > 0}
          />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="pt-4">
        <h2 className="text-sm font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest mb-6 transition-colors">📊 Engagement Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopContributorsChart />
          <DepartmentPiechart />
        </div>
      </div>

      {/* Moderation Section */}
      <div className="pt-4">
        <h2 className="text-sm font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest mb-6 transition-colors">🚨 Moderation Section</h2>
        <SimpleReportedPosts />
      </div>
    </div>
  );
};

export default AdminDashboard;