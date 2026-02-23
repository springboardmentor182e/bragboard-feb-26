import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import StatCard from "./components/StatCard";
import ReportedPosts from "./components/ReportedPosts";
import TopContributorsChart from "./components/TopContributorsChart";
import DepartmentEngagementChart from "./components/DepartmentEngagementChart";
import { FaUsers, FaBullhorn, FaFlag, FaHeart } from "react-icons/fa";
const AdminDashboard = () => {
  return (
    <AdminLayout>
<div className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen animate-fadeIn">
        <div className="flex justify-between items-center mb-10">
          <div>
<h1 className="text-3xl font-bold text-indigo-700 tracking-tight">              Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Monitor platform engagement and moderation
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-105 transform transition-all duration-300">
              + New Shoutout
            </button>

            <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition">
              View Reports
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          <StatCard
            title="Total Shoutouts"
            value="1247"
            icon={FaBullhorn}
            color="bg-indigo-600"
          />

          <StatCard
            title="Total Reactions"
            value="8592"
            icon={FaHeart}
            color="bg-pink-500"
          />

          <StatCard
            title="Active Users"
            value="342"
            icon={FaUsers}
            color="bg-green-500"
          />

          <StatCard
            title="Reported Posts"
            value="4"
            icon={FaFlag}
            color="bg-red-500"
          />

        </div>

        {/* Step 2 — Analytics Section */}
<div className="bg-indigo-50/40 rounded-2xl border border-indigo-100 p-8 shadow-md hover:shadow-lg transition mb-12">          <h2 className="text-lg font-semibold text-indigo-700 mb-6">
            📊 Engagement Analytics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopContributorsChart />
            <DepartmentEngagementChart />
          </div>
        </div>

        {/* Step 3 — Recent Activity */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-md hover:shadow-lg transition mb-12">
          <h3 className="text-xl font-semibold mb-4">
            Recent Activity
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between text-gray-700">
              <span>John reported a post</span>
              <span className="text-gray-400 text-xs">2 min ago</span>
            </li>

            <li className="flex justify-between text-gray-700">
              <span>Alice joined the platform</span>
              <span className="text-gray-400 text-xs">10 min ago</span>
            </li>

            <li className="flex justify-between text-gray-700">
              <span>Admin resolved a complaint</span>
              <span className="text-gray-400 text-xs">1 hour ago</span>
            </li>
          </ul>
        </div>

        {/* Reported Posts Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            🚩 Moderation Panel
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage reported and flagged content
          </p>
        </div>
        <ReportedPosts />

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;