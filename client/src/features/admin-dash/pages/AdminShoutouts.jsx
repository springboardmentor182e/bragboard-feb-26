import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";
import {
  getAdminShoutouts,
  getShoutoutStats,
  deleteAdminShoutout,
  approveShoutout,
  rejectShoutout,
} from "../../../services/adminService";

const STATUS_COLORS = {
  APPROVED: "bg-emerald-100 text-emerald-700",
  PENDING:  "bg-amber-100 text-amber-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

const AdminShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [stats, setStats]         = useState({ total: 0, approved: 0, pending: 0, rejected: 0, total_reactions: 0 });
  const [search, setSearch]       = useState("");
  const [department, setDept]     = useState("");
  const [statusFilter, setStatus] = useState("");
  const [loading, setLoading]     = useState(true);
  const [actionLoading, setAL]    = useState(null);

  const DEPARTMENTS = ["Engineering", "HR", "Design", "Marketing", "Sales", "Product", "Finance"];

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [sRes, stRes] = await Promise.all([
        getAdminShoutouts({ search, department, status: statusFilter }),
        getShoutoutStats(),
      ]);
      setShoutouts(sRes.data ?? []);
      setStats(stRes.data ?? {});
    } catch (err) {
      console.error("Shoutouts load error:", err);
    } finally {
      setLoading(false);
    }
  }, [search, department, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const withAction = async (fn, id) => {
    setAL(id);
    try { await fn(id); await load(); }
    catch (e) { console.error(e); }
    finally { setAL(null); }
  };

  const statCards = [
    { label: "Total Shout-Outs",  value: stats.total,           icon: "⭐", color: "text-indigo-600 bg-indigo-50" },
    { label: "Approved",          value: stats.approved,        icon: "✅", color: "text-emerald-600 bg-emerald-50" },
    { label: "Pending Review",    value: stats.pending,         icon: "⏳", color: "text-amber-600 bg-amber-50" },
    { label: "Total Reactions",   value: stats.total_reactions, icon: "💬", color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-1">Moderation</p>
            <h1 className="text-4xl font-black text-slate-950">Shout-Out Management</h1>
          </div>
          <span className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200 text-xs font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE
          </span>
        </div>
        <p className="text-slate-600 text-sm font-medium max-w-2xl">
          Monitor, approve, reject and delete recognition posts in real time.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${s.color}`}>{s.icon}</div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-3xl font-black text-slate-950">{loading ? "—" : s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text" placeholder="Search sender, receiver or message..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>
        <select value={department} onChange={(e) => setDept(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm">
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm">
          <option value="">All Status</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <p className="text-xs font-medium text-slate-500">
        Showing {shoutouts.length} shout-outs
      </p>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 grid grid-cols-12 gap-4 text-xs font-bold text-slate-600 uppercase tracking-wide">
          <div className="col-span-2">Sender</div>
          <div className="col-span-2">Receiver</div>
          <div className="col-span-3">Message</div>
          <div className="col-span-1">Dept</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Reactions</div>
          <div className="col-span-2">Actions</div>
        </div>

        <div className="divide-y divide-slate-100">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="px-6 py-4 grid grid-cols-12 gap-4">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="col-span-2 h-4 bg-slate-100 rounded animate-pulse" />
                ))}
              </div>
            ))
          ) : shoutouts.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">No shoutouts found</div>
          ) : (
            shoutouts.map((s) => (
              <div key={s.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Sender */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {(s.sender || "?")[0].toUpperCase()}
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">{s.sender}</p>
                    </div>
                  </div>
                  {/* Receiver */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {(s.receiver || "?")[0].toUpperCase()}
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">{s.receiver}</p>
                    </div>
                  </div>
                  {/* Message */}
                  <div className="col-span-3">
                    <p className="text-sm text-slate-700 truncate">{s.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{s.category} · {s.date}</p>
                  </div>
                  {/* Dept */}
                  <div className="col-span-1">
                    <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded truncate max-w-full">
                      {s.department || "—"}
                    </span>
                  </div>
                  {/* Status */}
                  <div className="col-span-1">
                    <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${STATUS_COLORS[s.status] || "bg-slate-100 text-slate-600"}`}>
                      {s.status}
                    </span>
                  </div>
                  {/* Reactions */}
                  <div className="col-span-1 text-sm font-semibold text-slate-600">
                    💬 {s.reactions ?? 0}
                  </div>
                  {/* Actions */}
                  <div className="col-span-2 flex items-center gap-1">
                    {s.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => withAction(approveShoutout, s.id)}
                          disabled={actionLoading === s.id}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => withAction(rejectShoutout, s.id)}
                          disabled={actionLoading === s.id}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors" title="Reject">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => withAction(deleteAdminShoutout, s.id)}
                      disabled={actionLoading === s.id}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-rose-600 transition-colors" title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminShoutouts;
