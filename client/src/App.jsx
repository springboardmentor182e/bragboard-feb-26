<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import {
  fetchReports,
  deleteReport,
  createReport,
  updateReport,
} from "./api";
=======
import ShoutoutManagementPage from "./features/admin-shoutout-management/pages/ShoutoutManagementPage";
import MyShoutoutsPage from "./features/employee-shoutout/pages/MyShoutoutsPage";
import ShoutoutFeedPage from "./features/employee-shoutout/pages/ShoutoutFeedPage";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoutoutManagementPage from "./features/employee-shoutout-management/pages/ShoutoutManagementPage";
>>>>>>> ca8e3839491ef5dd39f3e81410cdbf583e55e0c2

import Dashboard from "./components/Dashboard";
import ReportList from "./components/ReportList";
import ReportDetails from "./components/ReportDetails";
import Filters from "./components/Filters";

export default function App() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  // ✅ FIXED useEffect (no ESLint error)
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchReports();

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];

        setReports(data);
      } catch (err) {
        console.error("ERROR ❌", err);
      }
    };

    loadData();
  }, []);

  // 🔄 reload helper
  const reload = async () => {
    const res = await fetchReports();
    const data = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];
    setReports(data);
  };

  // ➕ ADD
  const handleAdd = async () => {
    await createReport({
      title: "New Report",
      reporter: "Admin",
      reported_user: "User123",
      category: "Spam",
      content: "Sample content",
      priority: "LOW",
      status: "PENDING",
    });
    reload();
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    await deleteReport(id);
    setSelected(null);
    reload();
  };

  // 🔄 UPDATE
  const handleUpdateStatus = async (id, status) => {
    await updateReport(id, { status });
    setSelected(null);
    reload();
  };

  // ✅ USE FILTERS (fix unused vars error)
  const filteredReports = reports.filter((r) => {
    return (
      `${r.title} ${r.reported_user}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status ? r.status === status : true) &&
      (priority ? r.priority === priority : true)
    );
  });

  // 📊 STATS
  const stats = [
    { title: "Pending", value: reports.filter(r => r.status === "PENDING").length },
    { title: "Reviewing", value: reports.filter(r => r.status === "REVIEWING").length },
    { title: "Resolved", value: reports.filter(r => r.status === "RESOLVED").length },
    { title: "Critical", value: reports.filter(r => r.priority === "HIGH").length },
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-6xl px-6 py-8">
=======
    <Routes>
      {/* Main Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-purple-950 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-purple-400">
              Dashboard Home 🚀
            </h1>
          </div>
        }
      />

      {/* Shoutout Page */}
      <Route
        path="/admin/shoutouts"
        element={<ShoutoutManagementPage />}
      />

      {/* Employee My Shoutouts Page */}
      <Route path="/my-shoutouts" element={<MyShoutoutsPage />} />

      {/* Main Shoutout Feed */}
      <Route path="/shoutouts" element={<ShoutoutFeedPage />} />
    </Routes>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-200 p-10">
              <h1 className="text-3xl font-bold">Leaderboard</h1>
              <p className="text-gray-600 mb-8">
                Top performers based on recognition and engagement
              </p>
>>>>>>> ca8e3839491ef5dd39f3e81410cdbf583e55e0c2

        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Reports Management</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Report
          </button>
        </div>

        <Dashboard stats={stats} />

        <Filters
          setSearch={setSearch}
          setStatus={setStatus}
          setPriority={setPriority}
        />

        <ReportList reports={filteredReports} onSelect={setSelected} />

        <ReportDetails
          report={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </div>
  );
}