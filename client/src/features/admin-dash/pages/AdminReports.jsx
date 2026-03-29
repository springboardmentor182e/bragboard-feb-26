import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/* ❌ REMOVED AdminLayout */
import ReportsStatsCards from "../reportsManagement/ReportsStatsCards";
import ReportsSearchBar from "../reportsManagement/ReportsSearchBar";
import ReportsList from "../reportsManagement/ReportsList";

import { fetchReports } from "../../../services/reportService";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

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

  const filteredReports = reports.filter((report) => {
    const query = searchQuery.toLowerCase();

    return (
      (report.report_code?.toLowerCase().includes(query) ||
        report.id?.toString().includes(query) ||
        report.reported_user?.toLowerCase().includes(query) ||
        report.reason?.toLowerCase().includes(query)) &&
      (statusFilter === "ALL" ||
        report.status?.toUpperCase() === statusFilter) &&
      (priorityFilter === "ALL" ||
        report.priority?.toUpperCase() === priorityFilter)
    );
  });

  const formatTime = (seconds) => {
    if (!seconds) return "0s";

    if (seconds < 60) return `${Math.floor(seconds)}s`;

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}m`;

    const hours = minutes / 60;
    return `${Math.floor(hours)}h`;
  };

  const calculateAvgResponseTime = () => {
    const resolved = reports.filter(
      (r) => r.status === "RESOLVED" && r.resolved_at
    );

    if (resolved.length === 0) return "0s";

    let total = 0;

    resolved.forEach((r) => {
      total +=
        (new Date(r.resolved_at) - new Date(r.created_at)) / 1000;
    });

    return formatTime(total / resolved.length);
  };

  const stats = {
    pending: reports.filter((r) => r.status === "PENDING").length,
    reviewing: reports.filter((r) => r.status === "REVIEWING").length,
    resolved: reports.filter((r) => r.status === "RESOLVED").length,
    avgResponseTime: calculateAvgResponseTime(),
  };

  return (
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

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-slate-500">
          Loading reports...
        </div>
      ) : (
        <>
          <ReportsStatsCards stats={stats} />

          <ReportsSearchBar
            onSearch={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

          <p className="text-sm text-slate-500">
            Showing {filteredReports.length} of {reports.length} reports
          </p>

          {filteredReports.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No reports found
            </div>
          ) : (
            <ReportsList
              reports={filteredReports}
              refreshReports={loadReports}
            />
          )}
        </>
      )}

    </motion.div>
  );
}

export default AdminReports;