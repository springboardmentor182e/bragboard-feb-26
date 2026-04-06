import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Eye, Edit2, Trash2, Archive, RotateCcw, Search, X } from "lucide-react";
import { getShoutouts, getArchivedShoutouts, deleteShoutout, archiveShoutout, unarchiveShoutout, editShoutout } from "../../../services/adminShoutoutService";
import { fetchReportsWithDetails } from "../../../services/reportService";
import ShoutoutDetailsModal from "../components/ShoutoutDetailsModal";
import DeleteShoutoutModal from "../components/DeleteShoutoutModal";
import EditShoutoutModal from "../components/EditShoutoutModal";
import ArchiveShoutoutModal from "../components/ArchiveShoutoutModal";
import AdminEditBadge from "../../../components/ui/AdminEditBadge";

const AdminShoutouts = () => {
  const [shoutouts, setShoutouts] = useState([]);
  const [archivedShoutouts, setArchivedShoutouts] = useState([]);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Details Modal State
  const [selectedShoutout, setSelectedShoutout] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  
  // Action Modals State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [unarchiveModalOpen, setUnarchiveModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [shoutsRes, archivedRes, reportsRes] = await Promise.all([
        getShoutouts(),
        getArchivedShoutouts(),
        fetchReportsWithDetails()
      ]);
      setShoutouts(shoutsRes.data || []);
      setArchivedShoutouts(archivedRes.data || []);
      setReports(reportsRes || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setShoutouts([]);
      setArchivedShoutouts([]);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteShoutout(id);
      setDeleteModalOpen(false);
      setDetailsModalOpen(false);
      setSelectedShoutout(null);
      fetchData();
    } catch (error) {
      console.error("Failed to delete shoutout:", error);
      alert("Failed to delete shoutout. Please try again.");
    }
  };

  const handleArchive = async (id) => {
    try {
      await archiveShoutout(id);
      setArchiveModalOpen(false);
      setDetailsModalOpen(false);
      setSelectedShoutout(null);
      fetchData();
    } catch (error) {
      console.error("Failed to archive shoutout:", error);
      alert("Failed to archive shoutout. Please try again.");
    }
  };

  const handleUnarchive = async (id) => {
    try {
      await unarchiveShoutout(id);
      setUnarchiveModalOpen(false);
      setSelectedShoutout(null);
      fetchData();
    } catch (error) {
      console.error("Failed to unarchive shoutout:", error);
      alert("Failed to unarchive shoutout. Please try again.");
    }
  };

  const handleEdit = async (id, formData) => {
    try {
      const { message, category } = formData;
      await editShoutout(id, message, category);
      setEditModalOpen(false);
      setDetailsModalOpen(false);
      setSelectedShoutout(null);
      fetchData();
    } catch (error) {
      console.error("Failed to edit shoutout:", error);
      alert("Failed to edit shoutout. Please try again.");
    }
  };

  // Details Modal Handlers
  const handleOpenDetailsModal = (shoutout) => {
    setSelectedShoutout(shoutout);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedShoutout(null);
  };

  // Delete Modal Handlers
  const handleOpenDeleteModal = (shoutout) => {
    setSelectedShoutout(shoutout);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedShoutout(null);
  };

  // Edit Modal Handlers
  const handleOpenEditModal = (shoutout) => {
    setSelectedShoutout(shoutout);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedShoutout(null);
  };

  // Archive Modal Handlers
  const handleOpenArchiveModal = (shoutout) => {
    setSelectedShoutout(shoutout);
    setArchiveModalOpen(true);
  };

  const handleCloseArchiveModal = () => {
    setArchiveModalOpen(false);
    setSelectedShoutout(null);
  };

  // Unarchive Modal Handlers
  const handleOpenUnarchiveModal = (shoutout) => {
    setSelectedShoutout(shoutout);
    setUnarchiveModalOpen(true);
  };

  const handleCloseUnarchiveModal = () => {
    setUnarchiveModalOpen(false);
    setSelectedShoutout(null);
  };

  const filteredShoutouts = shoutouts.filter((s) => {
    const matchesSearch = 
      (s.sender_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.message || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.id?.toString()).includes(searchQuery);
    const matchesDepartment = department === "" || (s.sender_department === department);
    return matchesSearch && matchesDepartment;
  });

  // Calculate stats considering reports
  // Get unresolved reports
  const unresolvedReports = reports.filter(r => r.status !== 'RESOLVED');
  const reportedShoutoutIds = new Set(unresolvedReports.map(r => r.shoutout_id || r.id));
  
  // Count by status and report status
  const rejectedCount = shoutouts.filter(s => s.status === 'REJECTED').length;
  const approvedShoutouts = shoutouts.filter(s => s.status === 'APPROVED');
  const underReviewCount = approvedShoutouts.filter(s => reportedShoutoutIds.has(s.id)).length;
  const publishedCount = approvedShoutouts.filter(s => !reportedShoutoutIds.has(s.id)).length;
  
  // Calculate engagement for published shoutouts only
  const publishedShoutouts = approvedShoutouts.filter(s => !reportedShoutoutIds.has(s.id));
  const publishedEngagement = publishedShoutouts.reduce((sum, s) => sum + (s.engagement?.reactions || 0) + (s.engagement?.comments || 0), 0);
  
  // Show engagement for published or indicate active posts
  const publishedEngagementText = publishedCount > 0 && publishedEngagement > 0 ? `${publishedEngagement} total engagement` : "Active posts";

  const stats = [
    { label: "Total Shout-Outs", value: shoutouts.length, subtext: "+12% this month", icon: "⭐" },
    { label: "Published", value: publishedCount, subtext: publishedEngagementText, icon: "✅", color: "green" },
    { label: "Under Review", value: underReviewCount, subtext: "Reported shout-outs", icon: "⚠️", color: "red" },
    { label: "Rejected", value: rejectedCount, subtext: "Taken down", icon: "❌", color: "purple" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Clean Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">Moderation</p>
            <h1 className="text-4xl font-black text-slate-950 dark:text-white">Shout-Out Management</h1>
          </div>
          <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>LIVE
            </p>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium max-w-2xl">
          Monitor and manage all recognition posts with powerful filtering and moderation tools.
        </p>
      </div>

      {/* Simple Stats Grid */}
      <div>
        <h2 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-950 dark:text-white">{stat.value}</p>
              {stat.subtext && <p className={`text-xs font-semibold mt-1 ${
                stat.color === 'green' ? 'text-green-600 dark:text-green-400' : 
                stat.color === 'red' ? 'text-red-600 dark:text-red-400' : 
                stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 
                'text-indigo-600 dark:text-indigo-400'
              }`}>{stat.subtext}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter - Simplified */}
      <div className="flex gap-3 items-center flex-col md:flex-row">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by sender, recipient, message, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium transition-colors"
          />
        </div>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium text-sm cursor-pointer transition-colors"
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Finance">Finance</option>
        </select>
      </div>

      {/* Results Info */}
      <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
        Showing {filteredShoutouts.length} of {shoutouts.length} shout-outs
      </div>

      {/* Clean Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        
        {/* Table Header */}
        <div className="bg-slate-50 dark:bg-slate-800/50 pl-0 pr-0 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-12 gap-12 items-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide pl-6">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Sender</div>
            <div className="col-span-1">Recipient(s)</div>
            <div className="col-span-2">Message</div>
            <div className="col-span-1">Campaign</div>
            <div className="col-span-1">Engagement</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 ml-auto">Actions</div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {loading ? (
            <div className="pl-0 pr-0 py-8 text-center text-slate-600 dark:text-slate-400">Loading shoutouts...</div>
          ) : filteredShoutouts.length === 0 ? (
            <div className="pl-0 pr-0 py-8 text-center text-slate-600 dark:text-slate-400">No shoutouts found</div>
          ) : (
            filteredShoutouts.map((shoutout) => {
              const senderInitials = (shoutout.sender_name || "?").substring(0, 2).toUpperCase();
              const shoutoutId = `SO-${String(shoutout.id).padStart(3, "0")}`;
              const statusBg = shoutout.status === "APPROVED" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : 
                               shoutout.status === "PENDING" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" : 
                               "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400";
              const statusLabel = shoutout.status === "APPROVED" ? "Active" : 
                                  shoutout.status === "PENDING" ? "Pending" : 
                                  "Archived";
              
              return (
                <div key={shoutout.id} className="pl-0 pr-0 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="grid grid-cols-12 gap-12 items-center pl-6">
                    
                    {/* ID */}
                    <div className="col-span-1">
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{shoutoutId}</p>
                    </div>
                    
                    {/* Sender */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {senderInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{shoutout.sender_name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{shoutout.sender_department}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recipients */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1">
                        {shoutout.recipients && shoutout.recipients.length > 0 ? (
                          shoutout.recipients.slice(0, 3).map((recipient, i) => {
                            const recInitials = recipient.name.substring(0, 1).toUpperCase();
                            const colors = ["bg-green-500", "bg-blue-500", "bg-teal-500"];
                            return (
                              <div key={i} className={`w-7 h-7 rounded-full ${colors[i % 3]} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 border border-white dark:border-slate-900`} title={recipient.name}>
                                {recInitials}
                              </div>
                            );
                          })
                        ) : null}
                        {shoutout.recipients && shoutout.recipients.length > 3 && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">+{shoutout.recipients.length - 3}</div>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{shoutout.message}</p>
                        {shoutout.is_edited && shoutout.edited_at && (
                          <AdminEditBadge editedAt={shoutout.edited_at} className="flex-shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Campaign/Category */}
                    <div className="col-span-1">
                      <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-semibold rounded">
                        {shoutout.category || "General"}
                      </span>
                    </div>

                    {/* Engagement */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart size={14} className="text-red-500" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{shoutout.engagement?.reactions || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={14} className="text-blue-500" />
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{shoutout.engagement?.comments || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded ${statusBg}`}>
                        {statusLabel}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-3 ml-auto pr-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleOpenDetailsModal(shoutout)}
                          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" 
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleOpenEditModal(shoutout)}
                          className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" 
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleOpenDeleteModal(shoutout)}
                          className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleOpenArchiveModal(shoutout)}
                          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" 
                          title="Archive"
                        >
                          <Archive size={18} />
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

      {/* Archived Shoutouts Section */}
      {archivedShoutouts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          {/* Section Header */}
          <div className="pb-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Archive size={24} className="text-slate-500 dark:text-slate-400" />
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Archived Shout-Outs</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              {archivedShoutouts.length} archived post{archivedShoutouts.length !== 1 ? 's' : ''} available for review and restoration
            </p>
          </div>

          {/* Archived Table */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            
            {/* Table Header */}
            <div className="bg-slate-50 dark:bg-slate-800/50 pl-0 pr-0 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="grid grid-cols-12 gap-12 items-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide pl-6">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Sender</div>
                <div className="col-span-1">Recipient(s)</div>
                <div className="col-span-2">Message</div>
                <div className="col-span-1">Campaign</div>
                <div className="col-span-1">Engagement</div>
                <div className="col-span-1">Archived</div>
                <div className="col-span-2 ml-auto">Actions</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {archivedShoutouts.map((shoutout) => {
                const senderInitials = (shoutout.sender_name || "?").substring(0, 2).toUpperCase();
                const shoutoutId = `SO-${String(shoutout.id).padStart(3, "0")}`;
                const archivedDate = shoutout.archived_at ? new Date(shoutout.archived_at).toLocaleDateString() : "N/A";
                
                return (
                  <div key={shoutout.id} className="pl-0 pr-0 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <div className="grid grid-cols-12 gap-12 items-center pl-6">
                      
                      {/* ID */}
                      <div className="col-span-1">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{shoutoutId}</p>
                      </div>
                      
                      {/* Sender */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {senderInitials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{shoutout.sender_name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{shoutout.sender_department}</p>
                          </div>
                        </div>
                      </div>

                      {/* Recipients */}
                      <div className="col-span-1">
                        <div className="flex items-center gap-1">
                          {shoutout.recipients && shoutout.recipients.length > 0 ? (
                            shoutout.recipients.slice(0, 3).map((recipient, i) => {
                              const recInitials = recipient.name.substring(0, 1).toUpperCase();
                              const colors = ["bg-green-500", "bg-blue-500", "bg-teal-500"];
                              return (
                                <div key={i} className={`w-7 h-7 rounded-full ${colors[i % 3]} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 border border-white dark:border-slate-900`} title={recipient.name}>
                                  {recInitials}
                                </div>
                              );
                            })
                          ) : null}
                          {shoutout.recipients && shoutout.recipients.length > 3 && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">+{shoutout.recipients.length - 3}</div>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="col-span-2">
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{shoutout.message}</p>
                      </div>

                      {/* Campaign/Category */}
                      <div className="col-span-1">
                        <span className="inline-block px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded">
                          {shoutout.category || "General"}
                        </span>
                      </div>

                      {/* Engagement */}
                      <div className="col-span-1">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart size={14} className="text-slate-400" />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{shoutout.engagement?.reactions || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={14} className="text-slate-400" />
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{shoutout.engagement?.comments || 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* Archived Date */}
                      <div className="col-span-1">
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{archivedDate}</p>
                      </div>

                      {/* Actions */}
                      <div className="col-span-3 ml-auto pr-6">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenUnarchiveModal(shoutout)}
                            className="p-2 text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors" 
                            title="Restore/Unarchive"
                          >
                            <RotateCcw size={18} />
                          </button>
                          <button 
                            onClick={() => handleOpenDeleteModal(shoutout)}
                            className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      <ShoutoutDetailsModal
        isOpen={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        shoutout={selectedShoutout}
        onArchive={() => handleArchive(selectedShoutout?.id)}
        onDelete={() => handleDelete(selectedShoutout?.id)}
      />

      {/* Delete Modal */}
      <DeleteShoutoutModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        shoutout={selectedShoutout}
        onConfirmDelete={handleDelete}
      />

      {/* Edit Modal */}
      <EditShoutoutModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        shoutout={selectedShoutout}
        onConfirmEdit={handleEdit}
      />

      {/* Archive Modal */}
      <ArchiveShoutoutModal
        isOpen={archiveModalOpen}
        onClose={handleCloseArchiveModal}
        shoutout={selectedShoutout}
        onConfirmArchive={handleArchive}
      />

      {/* Unarchive Modal */}
      <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${unarchiveModalOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"}`} onClick={handleCloseUnarchiveModal} />
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${unarchiveModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`} onClick={handleCloseUnarchiveModal}>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 transition-colors" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <RotateCcw size={24} />
              <div>
                <h2 className="text-xl font-bold">Restore Shout-Out</h2>
                <p className="text-emerald-100 text-xs">{selectedShoutout && `SO-${String(selectedShoutout.id).padStart(3, "0")}`}</p>
              </div>
            </div>
            <button onClick={handleCloseUnarchiveModal} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 transition-colors">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-4 flex items-start gap-3 transition-colors">
              <RotateCcw className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="text-sm font-bold text-green-900 dark:text-green-200 mb-1">Restore This Shout-Out</h3>
                <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                  This shout-out will be moved back to active posts. It will appear in the employee feed and other displays again.
                </p>
              </div>
            </div>

            {/* Shoutout Preview */}
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">Message Preview</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{selectedShoutout?.message}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-6 py-4 flex gap-3 transition-colors">
            <button 
              onClick={handleCloseUnarchiveModal} 
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => handleUnarchive(selectedShoutout?.id)} 
              className="flex-1 px-4 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg shadow-green-200 dark:shadow-none transition-all"
            >
              Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShoutouts;