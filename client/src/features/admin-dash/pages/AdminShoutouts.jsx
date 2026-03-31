import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Eye, Edit2, Trash2, Filter, Search } from "lucide-react";
import { getShoutouts, deleteShoutout } from "../../../services/adminShoutoutService";

const AdminShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShoutouts();
  }, []);

  const fetchShoutouts = async () => {
    try {
      setLoading(true);
      const res = await getShoutouts();
      setShoutouts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch shoutouts:", error);
      setShoutouts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteShoutout(id);
      fetchShoutouts();
    } catch (error) {
      console.error("Failed to delete shoutout:", error);
    }
  };

  const filteredShoutouts = shoutouts.filter((s) => {
    const matchesSearch = (s.sender || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.message || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = department === "" || (s.department === department);
    return matchesSearch && matchesDepartment;
  });

  const stats = [
    { label: "Total Shout-Outs", value: shoutouts.length, icon: "⭐" },
    { label: "Active Posts", value: shoutouts.length, icon: "❤️" },
    { label: "Flagged for Review", value: "0", icon: "🚨" },
    { label: "Total Engagement", value: shoutouts.length * 5, icon: "💬" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Clean Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-1">Moderation</p>
            <h1 className="text-4xl font-black text-slate-950">Shout-Out Management</h1>
          </div>
          <div className="px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>LIVE
            </p>
          </div>
        </div>
        <p className="text-slate-600 text-sm font-medium max-w-2xl">
          Monitor and manage all recognition posts with powerful filtering and moderation tools.
        </p>
      </div>

      {/* Simple Stats Grid */}
      <div>
        <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-slate-200 p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-950">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter - Simplified */}
      <div className="flex gap-3 items-center flex-col md:flex-row">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by sender or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium"
          />
        </div>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-sm cursor-pointer"
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Developer">Developer</option>
          <option value="HR">HR</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Results Info */}
      <div className="text-xs font-medium text-slate-600">
        Showing {filteredShoutouts.length} of {shoutouts.length} shout-outs
      </div>

      {/* Clean Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        
        {/* Table Header */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <div className="col-span-3">Sender</div>
            <div className="col-span-3">Message</div>
            <div className="col-span-2">Department</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-200">
          {loading ? (
            <div className="px-6 py-8 text-center text-slate-600">Loading shoutouts...</div>
          ) : filteredShoutouts.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-600">No shoutouts found</div>
          ) : (
            filteredShoutouts.map((shoutout) => {
              const senderInitials = (shoutout.sender || "?").substring(0, 2).toUpperCase();
              return (
                <div key={shoutout.id} className="px-6 py-4 hover:bg-slate-50 transition-colors group">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    
                    {/* Sender */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                          {senderInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{shoutout.sender}</p>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="col-span-3">
                      <p className="text-sm font-medium text-slate-900 truncate">{shoutout.message}</p>
                    </div>

                    {/* Department */}
                    <div className="col-span-2">
                      <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md">
                        {shoutout.department || "—"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <p className="text-sm text-slate-600">{shoutout.date || "—"}</p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded text-slate-600 hover:bg-slate-200 hover:text-indigo-600 transition-colors" title="View">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded text-slate-600 hover:bg-slate-200 hover:text-blue-600 transition-colors" title="Edit">
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(shoutout.id)}
                          className="p-1.5 rounded text-slate-600 hover:bg-slate-200 hover:text-rose-600 transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminShoutouts;