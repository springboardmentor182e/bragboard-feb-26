import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import AdminLayout from "../layout/AdminLayout";
import ReportsStatsCards from "../features/reportsManagement/ReportsStatsCards";
import ReportsSearchBar from "../features/reportsManagement/ReportsSearchBar";
import ReportsList from "../features/reportsManagement/ReportsList";

import { fetchReports } from "../services/reportService";

function AdminReports() {

  const [reports, setReports] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  /*
  LOAD REPORTS FROM BACKEND
  */
  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await fetchReports();
      setReports(data);
    } catch (error) {
      console.error("Failed to load reports:", error);
    }
  };

  /*
  FILTERING LOGIC
  */
  const filteredReports = reports.filter((report) => {

    const matchesSearch =
      report.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reported_user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reported_by?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || report.status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || report.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  /*
  LIVE STATS
  */
  const stats = {
    pending: reports.filter((r) => r.status === "PENDING").length,
    reviewing: reports.filter((r) => r.status === "REVIEWING").length,
    resolved: reports.filter((r) => r.status === "RESOLVED").length,
  };

  return (
    <AdminLayout>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reports Management
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor and manage all reported content
          </p>
        </div>

        {/* STATS */}
        <ReportsStatsCards stats={stats} />

        {/* SEARCH + FILTER */}
        <ReportsSearchBar
          onSearch={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        {/* COUNT */}
        <p className="text-sm text-slate-500">
          Showing {filteredReports.length} of {reports.length} reports
        </p>

        {/* LIST */}
        <ReportsList reports={filteredReports} refreshReports={loadReports} />

      </motion.div>

    </AdminLayout>
  );
}

export default AdminReports;