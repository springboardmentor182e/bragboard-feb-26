import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import AdminLayout from "../layout/AdminLayout";
import ReportsStatsCards from "../features/reportsManagement/ReportsStatsCards";
import ReportsSearchBar from "../features/reportsManagement/ReportsSearchBar";
import ReportsList from "../features/reportsManagement/ReportsList";

import { fetchReports } from "../services/reportService";

function AdminReports() {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  /*
  LOAD REPORTS
  */
  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchReports();
      setReports(data);
    } catch (error) {
      console.error("Failed to load reports:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  /*
  FILTER LOGIC (CLEAN + SAFE)
  */
  const filteredReports = reports.filter((report) => {

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      report.report_code?.toLowerCase().includes(query) ||
      report.id?.toString().includes(query) ||
      report.reported_user?.toLowerCase().includes(query) ||
      report.reported_by?.toLowerCase().includes(query) ||
      report.reason?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "ALL" ||
      report.status?.toUpperCase() === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" ||
      report.priority?.toUpperCase() === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  /*
  LIVE STATS (REAL DATA)
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

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-10 text-slate-500">
            Loading reports...
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No reports found
          </div>
        ) : (
          <ReportsList
            reports={filteredReports}
            refreshReports={loadReports}
          />
        )}

      </motion.div>

    </AdminLayout>
  );
}

export default AdminReports;