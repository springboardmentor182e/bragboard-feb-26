import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

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
      setReports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  /*
  FILTER LOGIC
  */
  const filteredReports = reports.filter((report) => {

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      report.report_code?.toLowerCase().includes(query) ||
      report.id?.toString().includes(query) ||
      report.reported_user?.toLowerCase().includes(query) ||
      report.reported_by?.toString().includes(query) ||
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
  🔥 FORMAT TIME (NEW)
  */
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${Math.floor(seconds)}s`;
    }

    const minutes = seconds / 60;
    if (minutes < 60) {
      const m = Math.floor(minutes);
      const s = Math.floor(seconds % 60);
      return `${m}m ${s}s`;
    }

    const hours = minutes / 60;
    if (hours < 24) {
      const h = Math.floor(hours);
      const m = Math.floor(minutes % 60);
      return `${h}h ${m}m`;
    }

    const days = hours / 24;
    const d = Math.floor(days);
    const h = Math.floor(hours % 24);
    return `${d}d ${h}h`;
  };

  /*
  🔥 AVG RESPONSE TIME (NEW)
  */
  const calculateAvgResponseTime = () => {
    const resolvedReports = reports.filter(
      (r) => r.status === "RESOLVED" && r.resolved_at
    );

    if (resolvedReports.length === 0) return "0s";

    let totalSeconds = 0;

    resolvedReports.forEach((r) => {
      const created = new Date(r.created_at);
      const resolved = new Date(r.resolved_at);

      const diffSeconds = (resolved - created) / 1000;
      totalSeconds += diffSeconds;
    });

    const avgSeconds = totalSeconds / resolvedReports.length;

    return formatTime(avgSeconds);
  };

  /*
  STATS
  */
  const stats = {
    pending: reports.filter((r) => r.status === "PENDING").length,
    reviewing: reports.filter((r) => r.status === "REVIEWING").length,
    resolved: reports.filter((r) => r.status === "RESOLVED").length,
    avgResponseTime: calculateAvgResponseTime(), // ✅ NEW
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

        {/* STATS */}
        <ReportsStatsCards stats={stats} />

        {/* SEARCH */}
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
  );
}

export default AdminReports;