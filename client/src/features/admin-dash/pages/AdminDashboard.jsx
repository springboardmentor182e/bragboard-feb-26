import React, { useState, useEffect, useCallback } from "react";
import StatCard from "../components/StatCard";
import TopContributorsChart from "../components/charts/TopContributorsChart";
import DepartmentPiechart from "../components/charts/DepartmentPiechart";
import ReportedPosts from "../components/ReportedPosts";
import {
  getDashboardStats,
  getTopContributors,
  getDepartmentStats,
} from "../../../services/adminService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_shoutouts: 0,
    total_reactions: 0,
    active_users: 0,
    reports: 0,
    shoutout_trend: "+0%",
  });
  const [contributors, setContributors] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, contribRes, deptRes] = await Promise.all([
        getDashboardStats(),
        getTopContributors(5),
        getDepartmentStats(),
      ]);
      const d = statsRes.data;
      setStats({
        total_shoutouts: d.total_shoutouts ?? d.total_posts ?? 0,
        total_reactions: d.total_reactions ?? 0,
        active_users: d.active_users ?? d.total_users ?? 0,
        reports: d.reports ?? d.total_reports ?? 0,
        shoutout_trend: d.shoutout_trend ?? "+0%",
      });
      setContributors(contribRes.data ?? []);
      setDeptData(deptRes.data ?? []);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="pt-4 pb-8 border-b border-gray-200">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">Platform</p>
            <h1 className="text-5xl font-black text-gray-950 tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-xs font-semibold text-indigo-700">LIVE</p>
          </div>
        </div>
        <p className="text-base text-gray-600 max-w-2xl mt-3">
          Real-time platform analytics and moderation controls
        </p>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Shout-Outs"  value={stats.total_shoutouts} trend={stats.shoutout_trend} icon="chart" />
            <StatCard title="Reactions"   value={stats.total_reactions}  icon="heart" />
            <StatCard title="Users"       value={stats.active_users}     icon="users" />
            <StatCard title="Reports"     value={stats.reports}          icon="alerts" />
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="pt-4">
        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6">Engagement Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopContributorsChart data={contributors} loading={loading} />
          <DepartmentPiechart   data={deptData}     loading={loading} />
        </div>
      </div>

      {/* Moderation */}
      <div className="pt-4">
        <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6">Moderation Queue</h2>
        <ReportedPosts />
      </div>
    </div>
  );
};

export default AdminDashboard;
