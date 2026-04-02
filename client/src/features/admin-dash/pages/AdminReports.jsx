import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Eye, CheckCircle, Clock, Search, Trash2, Flag } from "lucide-react";
import {
  getAdminReports,
  getReportStats,
  resolveReport,
  setReportStatus,
  deleteAdminReport,
} from "../../../services/adminService";

const PRIORITY_STYLE = {
  HIGH:     "border-l-4 border-orange-400",
  CRITICAL: "border-l-4 border-red-500",
  LOW:      "border-l-4 border-green-400",
};
const PRIORITY_BADGE = {
  HIGH:     "bg-orange-50 text-orange-600 border border-orange-200",
  CRITICAL: "bg-red-50 text-red-600 border border-red-200",
  LOW:      "bg-green-50 text-green-600 border border-green-200",
};
const STATUS_BADGE = {
  PENDING:   "bg-yellow-50 text-yellow-600 border border-yellow-200",
  REVIEWING: "bg-blue-50 text-blue-600 border border-blue-200",
  RESOLVED:  "bg-green-50 text-green-600 border border-green-200",
};

// ─── REVIEW MODAL ─────────────────────────────────────────────
const ReviewModal = ({ report, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const act = async (fn) => {
    setLoading(true);
    try { await fn(); await onRefresh(); onClose(); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8 space-y-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Report #{report.id}</p>
            <h2 className="text-xl font-black text-slate-900 mt-1">{report.reason}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className={`text-xs px-3 py-1 rounded-lg font-bold ${PRIORITY_BADGE[report.priority] || "bg-slate-100 text-slate-600"}`}>{report.priority}</span>
          <span className={`text-xs px-3 py-1 rounded-lg font-bold ${STATUS_BADGE[report.status] || "bg-slate-100 text-slate-600"}`}>{report.status}</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Description</p>
          <p className="text-sm text-slate-700 leading-relaxed">{report.description || "No description provided."}</p>
        </div>
        <div className="text-xs text-slate-500 space-y-1">
          <p>Reported by user ID: <span className="font-bold text-slate-700">{report.reported_by}</span></p>
          <p>Shoutout ID: <span className="font-bold text-slate-700">{report.shoutout_id}</span></p>
          <p>Created: <span className="font-bold text-slate-700">{new Date(report.created_at).toLocaleString()}</span></p>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <button onClick={() => act(() => resolveReport(report.id))} disabled={loading}
            className="flex-1 px-4 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 disabled:opacity-50">
            ✅ Resolve
          </button>
          <button onClick={() => act(() => setReportStatus(report.id, "REVIEWING"))} disabled={loading}
            className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50">
            👁 Reviewing
          </button>
          <button onClick={() => act(() => deleteAdminReport(report.id))} disabled={loading}
            className="px-4 py-2.5 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 disabled:opacity-50">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────
const AdminReports = () => {
  const [reports, setReports]       = useState([]);
  const [stats, setStats]           = useState({ pending: 0, reviewing: 0, resolved: 0, avg_response_time: "0s" });
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("ALL");
  const [priorityFilter, setPri]    = useState("ALL");
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [rRes, sRes] = await Promise.all([
        getAdminReports({ status: statusFilter !== "ALL" ? statusFilter : undefined }),
        getReportStats(),
      ]);
      setReports(rRes.data ?? []);
      setStats(sRes.data ?? {});
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const filtered = reports.filter((r) => {
    const q = search.toLowerCase();
    const matchQ = !q || String(r.id).includes(q) || (r.reason || "").toLowerCase().includes(q) || (r.description || "").toLowerCase().includes(q);
    const matchP = priorityFilter === "ALL" || r.priority === priorityFilter;
    return matchQ && matchP;
  });

  const statCards = [
    { label: "Pending",           value: stats.pending,             icon: AlertTriangle, color: "bg-red-100 text-red-600" },
    { label: "Reviewing",         value: stats.reviewing,           icon: Eye,           color: "bg-blue-100 text-blue-600" },
    { label: "Resolved",          value: stats.resolved,            icon: CheckCircle,   color: "bg-green-100 text-green-600" },
    { label: "Avg Response Time", value: stats.avg_response_time,   icon: Clock,         color: "bg-yellow-100 text-yellow-600" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reports Management</h1>
        <p className="text-slate-500 mt-1 text-sm">Monitor and resolve all reported content — live from database</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{loading ? "—" : s.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by ID or reason..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="REVIEWING">Reviewing</option>
          <option value="RESOLVED">Resolved</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPri(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="ALL">All Priority</option>
          <option value="LOW">Low</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <p className="text-xs text-slate-500">Showing {filtered.length} of {reports.length} reports</p>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Flag size={36} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No reports found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((report) => (
            <div key={report.id}
              className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all ${PRIORITY_STYLE[report.priority] || ""}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-slate-700 text-sm">RPT-{report.id}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${PRIORITY_BADGE[report.priority] || "bg-slate-100 text-slate-600"}`}>{report.priority}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-bold ${STATUS_BADGE[report.status] || "bg-slate-100 text-slate-600"}`}>{report.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{report.reason}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{report.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <span>By user #{report.reported_by}</span>
                    <span>Shoutout #{report.shoutout_id}</span>
                    <span>{new Date(report.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(report)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors flex-shrink-0">
                  <Eye size={14} /> Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && <ReviewModal report={selected} onClose={() => setSelected(null)} onRefresh={load} />}
    </motion.div>
  );
};

export default AdminReports;
