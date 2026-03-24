import React, { useEffect, useState } from "react";
import {
  fetchReports,
  deleteReport,
  createReport,
  updateReport,
} from "./api";

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
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-6xl px-6 py-8">

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