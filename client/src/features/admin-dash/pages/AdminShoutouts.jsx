import React, { useState } from "react";
import { Heart, MessageCircle, Eye, Edit2, Trash2, Filter, Search } from "lucide-react";

const AdminShoutouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const mockShoutouts = [
    {
      id: "SO-001",
      sender: { name: "Sarah Chen", initials: "SC", dept: "Engineering" },
      recipients: [{ name: "JP", initials: "JP" }, { name: "DK", initials: "DK" }],
      message: "Incredible work on the Q4...",
      campaign: "Q1 Excellence Recognition Drive",
      engagement: { likes: 24, comments: 8 },
      badge: "Team Player",
      status: "Active",
      timestamp: "2 hours ago",
    },
    {
      id: "SO-002",
      sender: { name: "Michael Rodriguez", initials: "MR", dept: "Design" },
      recipients: [{ name: "EW", initials: "EW" }],
      message: "Emily's presentation t...",
      campaign: "Innovation Week",
      engagement: { likes: 32, comments: 12 },
      badge: "Innovation Star",
      status: "Active",
      timestamp: "4 hours ago",
    },
    {
      id: "SO-003",
      sender: { name: "Alex Cooper", initials: "AC", dept: "Marketing" },
      recipients: [{ name: "MJ", initials: "MJ" }],
      message: "Marcus jumped in to help wit...",
      campaign: "",
      engagement: { likes: 18, comments: 5 },
      badge: "Problem Solver",
      status: "Active",
      timestamp: "6 hours ago",
    },
    {
      id: "SO-004",
      sender: { name: "Rachel Anderson", initials: "RA", dept: "Sales" },
      recipients: [{ name: "TW", initials: "TW" }],
      message: "Tom went above and...",
      campaign: "Q1 Excellence Recognition Drive",
      engagement: { likes: 45, comments: 15 },
      badge: "Customer Champion",
      status: "Active",
      timestamp: "8 hours ago",
    },
    {
      id: "SO-005",
      sender: { name: "John Smith", initials: "JS", dept: "Engineering" },
      recipients: [{ name: "EC", initials: "EC" }],
      message: "Great work team! Keep it...",
      campaign: "",
      engagement: { likes: 3, comments: 0 },
      badge: "Team Player",
      status: "Reported",
      timestamp: "12 hours ago",
    },
  ];

  const stats = [
    { label: "Total Shout-Outs", value: "7", icon: "⭐" },
    { label: "Active Posts", value: "5", icon: "❤️" },
    { label: "Flagged for Review", value: "1", icon: "🚨" },
    { label: "Total Engagement", value: "122", icon: "💬" },
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
            placeholder="Search by sender, recipient, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-sm cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="reported">Reported</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Results Info */}
      <div className="text-xs font-medium text-slate-600">
        Showing {mockShoutouts.length} of {mockShoutouts.length} shout-outs
      </div>

      {/* Clean Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        
        {/* Table Header */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <div className="col-span-2">Sender</div>
            <div className="col-span-2">Recipients</div>
            <div className="col-span-2">Message</div>
            <div className="col-span-2">Campaign</div>
            <div className="col-span-2">Engagement</div>
            <div className="col-span-2">Status</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-200">
          {mockShoutouts.map((shoutout, idx) => (
            <div key={idx} className="px-6 py-4 hover:bg-slate-50 transition-colors group">
              <div className="grid grid-cols-12 gap-4 items-center">
                
                {/* Sender */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                      {shoutout.sender.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{shoutout.sender.name}</p>
                      <p className="text-xs text-slate-600">{shoutout.sender.dept}</p>
                    </div>
                  </div>
                </div>

                {/* Recipients */}
                <div className="col-span-2">
                  <div className="flex items-center gap-1">
                    {shoutout.recipients.map((recipient, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold"
                        title={recipient.name}
                      >
                        {recipient.initials}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="col-span-2">
                  <p className="text-sm font-medium text-slate-900 truncate">{shoutout.message}</p>
                </div>

                {/* Campaign */}
                <div className="col-span-2">
                  {shoutout.campaign ? (
                    <span className="inline-block px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md">
                      {shoutout.campaign.length > 20 ? shoutout.campaign.substring(0, 20) + "..." : shoutout.campaign}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </div>

                {/* Engagement */}
                <div className="col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart size={14} className="text-rose-500 fill-rose-500" />
                      <span className="text-sm font-semibold text-slate-900">{shoutout.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} className="text-blue-500" />
                      <span className="text-sm font-semibold text-slate-900">{shoutout.engagement.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-bold rounded-md border ${
                        shoutout.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-rose-100 text-rose-700 border-rose-200"
                      }`}
                    >
                      {shoutout.status}
                    </span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded text-slate-600 hover:bg-slate-200 hover:text-indigo-600 transition-colors" title="View">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded text-slate-600 hover:bg-slate-200 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-1.5 rounded text-slate-600 hover:bg-slate-200 hover:text-rose-600 transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge & Timestamp */}
              <div className="mt-3 flex items-center gap-3 ml-8">
                <span className="inline-block px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-md border border-yellow-200">
                  {shoutout.badge}
                </span>
                <span className="text-xs text-slate-500">{shoutout.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminShoutouts;