import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Shield, Search, Plus } from "lucide-react";
import {
  getAdminUsers,
  createAdminUser,
  toggleUserStatus,
  updateUserRole,
  deleteAdminUser,
} from "../../../services/adminService";

// ─── ADD EMPLOYEE MODAL ───────────────────────────────────────
const AddModal = ({ onClose, onAdded }) => {
  const [form, setForm] = useState({ name: "", email: "", department: "", role: "Employee", status: "Active", password: "123456" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!form.name || !form.email) { setError("Name and email required"); return; }
    try {
      setSaving(true);
      await createAdminUser(form);
      onAdded();
      onClose();
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to create user");
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <h2 className="text-2xl font-black text-slate-900 mb-6">Add Employee</h2>
        {error && <p className="text-sm text-rose-600 mb-4 bg-rose-50 p-3 rounded-lg">{error}</p>}
        {[
          { label: "Full Name", key: "name", type: "text", placeholder: "John Doe" },
          { label: "Email", key: "email", type: "email", placeholder: "john@company.com" },
          { label: "Department", key: "department", type: "text", placeholder: "Engineering" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} className="mb-4">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">{label}</label>
            <input type={type} placeholder={placeholder} value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm" />
          </div>
        ))}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Role</label>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm">
            <option>Employee</option><option>Manager</option><option>Admin</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50">Cancel</button>
          <button onClick={submit} disabled={saving}
            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 disabled:opacity-50">
            {saving ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────
const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch]       = useState("");
  const [roleFilter, setRole]     = useState("All");
  const [statusFilter, setStat]   = useState("All");
  const [showModal, setModal]     = useState(false);
  const [loading, setLoading]     = useState(true);
  const [actionId, setActionId]   = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminUsers();
      setEmployees(res.data ?? []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const withAction = async (fn, id) => {
    setActionId(id);
    try { await fn(id); await load(); }
    catch (e) { console.error(e); }
    finally { setActionId(null); }
  };

  const filtered = employees.filter((emp) => {
    const q = search.toLowerCase();
    const matchQ = emp.name.toLowerCase().includes(q) || emp.email.toLowerCase().includes(q);
    const matchR = roleFilter === "All" || emp.role === roleFilter;
    const matchS = statusFilter === "All" || emp.status === statusFilter;
    return matchQ && matchR && matchS;
  });

  const total      = employees.length;
  const active     = employees.filter((e) => e.status === "Active").length;
  const suspended  = employees.filter((e) => e.status === "Suspended").length;
  const admins     = employees.filter((e) => e.role === "Admin").length;

  const statCards = [
    { label: "Total Users", value: total,     icon: <Users size={22} />,     bg: "bg-indigo-100", color: "text-indigo-600" },
    { label: "Active",      value: active,    icon: <UserCheck size={22} />, bg: "bg-emerald-100", color: "text-emerald-600" },
    { label: "Suspended",   value: suspended, icon: <UserX size={22} />,     bg: "bg-rose-100", color: "text-rose-600" },
    { label: "Admins",      value: admins,    icon: <Shield size={22} />,    bg: "bg-amber-100", color: "text-amber-600" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">User Management</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage roles, status and employee records</p>
        </div>
        <button onClick={() => setModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${c.bg} ${c.color}`}>{c.icon}</div>
            <p className="text-sm text-slate-500 font-medium">{c.label}</p>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mt-1">
              {loading ? <span className="text-slate-300">—</span> : c.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by name or email..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm" />
        </div>
        <select value={roleFilter} onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="All">All Roles</option>
          <option>Admin</option><option>Manager</option><option>Employee</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStat(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
          <option value="All">All Status</option>
          <option>Active</option><option>Suspended</option>
        </select>
      </div>

      <p className="text-xs text-slate-500 font-medium">Showing {filtered.length} of {employees.length} users</p>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Sent</th>
                  <th className="px-6 py-4 text-center">Received</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">No employees found</td></tr>
                ) : (
                  filtered.map((emp, idx) => (
                    <motion.tr key={emp.id}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                      className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow">
                            {emp.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{emp.name}</p>
                            <p className="text-xs text-slate-500">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-600 text-sm font-medium">{emp.department || "—"}</td>
                      <td className="px-6 py-5">
                        <select value={emp.role}
                          onChange={(e) => withAction(() => updateUserRole(emp.id, e.target.value), emp.id)}
                          disabled={actionId === emp.id}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-indigo-400 outline-none">
                          <option>Admin</option><option>Manager</option><option>Employee</option>
                        </select>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${emp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="text-sm font-bold text-indigo-600">{emp.shoutouts_sent ?? 0}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="text-sm font-bold text-purple-600">{emp.shoutouts_received ?? 0}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => withAction(toggleUserStatus, emp.id)} disabled={actionId === emp.id}
                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all disabled:opacity-50 ${emp.status === "Active" ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}>
                            {emp.status === "Active" ? "Suspend" : "Activate"}
                          </button>
                          <button onClick={() => { if (window.confirm(`Delete ${emp.name}?`)) withAction(deleteAdminUser, emp.id); }}
                            disabled={actionId === emp.id}
                            className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-50">
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && <AddModal onClose={() => setModal(false)} onAdded={load} />}
    </motion.div>
  );
};

export default AdminEmployees;
