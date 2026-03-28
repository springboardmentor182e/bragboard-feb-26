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
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Shout-Outs" value={stats.total_shoutouts} />
        <StatCard title="Reactions" value={stats.total_reactions} />
        <StatCard title="Users" value={stats.active_users} />
        <StatCard title="Reports" value={stats.reports} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <TopContributorsChart />
        <DepartmentPiechart />
      </div>

      <ReportedPosts />
    </div>
  );
};

export default AdminDashboard;